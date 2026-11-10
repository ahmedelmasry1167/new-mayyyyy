// ASG shop: search, faceted filters, pagination and a quote list
(function () {
    "use strict";
    const G = window.ASGGlass;
    const RAW = window.ASG_ALL_PRODUCTS || [];
    const BRAND_NAMES = window.ASG_BRANDS || {};
    const PER_PAGE = 36;
    const fmt = n => Number(n).toLocaleString("en-US");
    const esc = G.escapeHtml;
    const T = window.ASG_I18N ? window.ASG_I18N.t : (k => k);

    const CATS = [
        ["windshield", "cat_windshield"], ["side-window", "cat_side"], ["rear-window", "cat_rear"], ["other", "cat_other"]
    ];
    const TYPES = [["Laminated", "type_laminated"], ["Tempered", "type_tempered"]];
    const TINT_KEY = { clear: "code_cl", green: "code_gn", grey: "code_gy", bronze: "code_br", blue: "code_bl", privacy: "tint_privacy" };
    const tintLabel = k => T(TINT_KEY[k] || k);
    const TINT_ORDER = ["clear", "green", "grey", "bronze", "blue", "privacy"];
    const PART_ORDER = { "Windshield": 0, "Front door": 1, "Door": 1, "Rear door": 2, "Vent": 3, "Side": 4, "Backlight": 5, "Other glass": 6 };
    const CAT_WORDS = {
        "windshield": "windshield windscreen front glass ws",
        "side-window": "side window door glass",
        "rear-window": "rear window backlight back glass",
        "other": "other glass"
    };

    // Strip hyphens/underscores so "hiace" matches catalog text like "Hi-Ace", "hilux" matches
    // "Hi-Lux", "cclass" matches "C-Class", etc. Applied to both the search text and the query.
    const norm = s => (s || "").toLowerCase().replace(/[-_]/g, "");

    // ---- Prepare catalog ----
    const items = RAW.map(p => {
        const glass = G.decodeGlass(p);
        const pos = G.positionOf(p);
        const cat = G.categoryOf(p);
        const key = p.key || G.brandKey(p.brand);
        const title = (p.part || pos.partName || "Glass") + (pos.detail ? ` (${pos.detail.toLowerCase()})` : "") + (pos.side ? `, ${pos.side.toLowerCase()}` : "");
        const hay = norm([p.brand, p.model, p.part, pos.detail, pos.side, glass.type, G.TINTS[glass.tint].label,
            glass.band ? G.TINTS[glass.band].label + " band shade" : "", p.euroCode, p.name, p.arabicPart, p.arabicColor, CAT_WORDS[cat]]
            .join(" "));
        return { p, key, cat, glass, pos, title, hay, type: glass.type === "Glass" ? "" : glass.type };
    });
    items.sort((a, b) =>
        a.p.brand.localeCompare(b.p.brand) || a.p.model.localeCompare(b.p.model, undefined, { numeric: true }) ||
        (PART_ORDER[a.p.part] ?? 9) - (PART_ORDER[b.p.part] ?? 9) || a.title.localeCompare(b.title));
    const byId = new Map(items.map(i => [i.p.id, i]));

    const brands = {};
    items.forEach(i => {
        if (!brands[i.key]) brands[i.key] = { key: i.key, name: BRAND_NAMES[i.key] || i.p.brand, models: new Set() };
        brands[i.key].models.add(i.p.model);
    });
    const brandKeys = Object.keys(brands).sort((a, b) => brands[a].name.localeCompare(brands[b].name));

    // Deduplicated "brand model" list for the Model suggestion group, e.g. "Toyota Hiace".
    const modelList = [];
    {
        const seen = new Set();
        items.forEach(i => {
            const mk = i.key + "|" + i.p.model;
            if (seen.has(mk)) return;
            seen.add(mk);
            modelList.push({ key: i.key, brand: brands[i.key].name, model: i.p.model });
        });
        modelList.sort((a, b) => a.brand.localeCompare(b.brand) || a.model.localeCompare(b.model, undefined, { numeric: true }));
    }

    // ---- State (mirrored in the URL so results can be shared) ----
    const params = new URLSearchParams(location.search);
    const state = {
        q: params.get("q") || "",
        brand: brands[params.get("brand")] ? params.get("brand") : "",
        model: params.get("model") || "",
        cat: params.get("cat") || "",
        type: params.get("type") || "",
        tint: params.get("tint") || "",
        sort: params.get("sort") || "relevance",
        page: Math.max(1, parseInt(params.get("page"), 10) || 1)
    };
    if (state.model && state.brand && !brands[state.brand].models.has(state.model)) state.model = "";

    function syncUrl() {
        const p = new URLSearchParams();
        ["q", "brand", "model", "cat", "type", "tint"].forEach(k => state[k] && p.set(k, state[k]));
        if (state.sort !== "relevance") p.set("sort", state.sort);
        if (state.page > 1) p.set("page", state.page);
        history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p : ""));
    }

    function tokens() { return norm(state.q).split(/\s+/).filter(Boolean); }

    function matches(i, skip, toks) {
        if (skip !== "brand" && state.brand && i.key !== state.brand) return false;
        if (skip !== "model" && state.model && i.p.model !== state.model) return false;
        if (skip !== "cat" && state.cat && i.cat !== state.cat) return false;
        if (skip !== "type" && state.type && i.type !== state.type) return false;
        if (skip !== "tint" && state.tint && i.glass.tint !== state.tint) return false;
        for (const t of toks) if (!i.hay.includes(t)) return false;
        return true;
    }

    function facetCounts(field, getter, toks) {
        const counts = {};
        items.forEach(i => { if (matches(i, field, toks)) { const v = getter(i); counts[v] = (counts[v] || 0) + 1; } });
        return counts;
    }

    // ---- Rendering ----
    const $ = id => document.getElementById(id);

    function chip(group, value, label, count, extra) {
        const on = state[group] === value;
        return `<button class="chip" data-group="${group}" data-value="${value}" aria-pressed="${on}" ${!count && !on ? "disabled style='opacity:.4'" : ""}>${extra || ""}${label} <small>${fmt(count || 0)}</small></button>`;
    }

    function renderFacets(toks) {
        const cc = facetCounts("cat", i => i.cat, toks);
        $("f-cat").innerHTML = CATS.map(([v, l]) => chip("cat", v, T(l), cc[v])).join("");
        const tc = facetCounts("type", i => i.type, toks);
        $("f-type").innerHTML = TYPES.map(([v, l]) => chip("type", v, T(l), tc[v])).join("");
        const nc = facetCounts("tint", i => i.glass.tint, toks);
        $("f-tint").innerHTML = TINT_ORDER.map(t => chip("tint", t, tintLabel(t), nc[t],
            `<span class="swatch" style="background:${G.TINTS[t].fill}"></span>`)).join("");
        renderBrandList(facetCounts("brand", i => i.key, toks));
        renderModelList(state.brand ? facetCounts("model", i => i.p.model, toks) : {});
    }

    let lastBrandCounts = {};
    function renderBrandList(counts) {
        if (counts) lastBrandCounts = counts;
        const f = $("brand-search").value.trim().toLowerCase();
        const list = brandKeys.filter(k => !f || brands[k].name.toLowerCase().includes(f));
        const all = `<button class="brand-opt" data-brand="" aria-pressed="${!state.brand}"><span class="brand-mark brand-mark--text"><span>ALL</span></span><span>${esc(T("all_brands_short"))}</span><small></small></button>`;
        $("f-brand").innerHTML = (f ? "" : all) + list.map(k => `
            <button class="brand-opt" data-brand="${k}" aria-pressed="${state.brand === k}">
                ${G.brandMark(brands[k].name, k)}<span>${esc(brands[k].name)}</span><small>${fmt(lastBrandCounts[k] || 0)}</small>
            </button>`).join("") || `<p class="form-hint" style="padding:8px">${esc(T("no_brand_match"))} “${esc(f)}”.</p>`;
    }

    let lastModelCounts = {};
    function renderModelList(counts) {
        if (counts) lastModelCounts = counts;
        if (!state.brand) {
            $("model-search").value = "";
            $("f-model").innerHTML = `<p class="form-hint" style="padding:8px">${esc(T("pick_brand_first"))}</p>`;
            return;
        }
        const f = $("model-search").value.trim().toLowerCase();
        const models = [...brands[state.brand].models].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
        const list = models.filter(m => !f || m.toLowerCase().includes(f));
        const all = `<button class="brand-opt model-opt" data-model="" aria-pressed="${!state.model}"><span>${esc(T("all_models_short"))}</span><small></small></button>`;
        $("f-model").innerHTML = (f ? "" : all) + list.map(m => `
            <button class="brand-opt model-opt" data-model="${esc(m)}" aria-pressed="${state.model === m}">
                <span>${esc(m)}</span><small>${fmt(lastModelCounts[m] || 0)}</small>
            </button>`).join("") || `<p class="form-hint" style="padding:8px">${esc(T("no_brand_match"))} “${esc(f)}”.</p>`;
    }

    function renderActive() {
        const tags = [];
        if (state.q) tags.push(["q", `“${state.q}”`]);
        if (state.brand) tags.push(["brand", brands[state.brand].name]);
        if (state.model) tags.push(["model", state.model]);
        if (state.cat) tags.push(["cat", T(CATS.find(c => c[0] === state.cat)?.[1]) || state.cat]);
        if (state.type) tags.push(["type", T(TYPES.find(t => t[0] === state.type)?.[1]) || state.type]);
        if (state.tint) tags.push(["tint", tintLabel(state.tint)]);
        $("active-filters").innerHTML = tags.map(([k, l]) => `<button data-clear="${k}" aria-label="${esc(T("remove_filter"))} ${esc(l)}">${esc(l)}</button>`).join("") +
            (tags.length > 1 ? `<button data-clear="all">${esc(T("clear_all"))}</button>` : "");
    }

    function renderBanner() {
        if (!state.brand) { $("brand-banner").innerHTML = ""; return; }
        const b = brands[state.brand];
        $("brand-banner").innerHTML = `<div class="brand-banner">${G.brandMark(b.name, b.key)}<div><h2>${esc(b.name)}</h2>
            <p>${fmt(items.filter(i => i.key === b.key).length)} glass parts for ${fmt(b.models.size)} models</p></div></div>`;
    }

    function card(i) {
        const p = i.p, g = i.glass, inList = !!quote[p.id];
        const tint = G.TINTS[g.tint];
        const typeTag = i.type ? `<span class="tag ${i.type === "Laminated" ? "lam" : "tem"}">${esc(T(i.type === "Laminated" ? "type_laminated" : "type_tempered"))}</span>` : "";
        return `<article class="product-card">
            <div class="product-art">${G.brandMark(brands[i.key].name, i.key)}${typeTag}${G.productSVG(p)}</div>
            <div class="product-body">
                <div class="product-model">${esc(brands[i.key].name)} ${esc(p.model)}</div>
                <h3 class="product-title">${esc(i.title)}</h3>
                <ul class="spec">
                    <li><span class="swatch" style="background:${tint.fill}"></span>${g.tintKnown ? esc(tintLabel(g.tint)) : esc(T("tint_on_request"))}</li>
                    ${g.band ? `<li><span class="swatch band" style="background:linear-gradient(180deg,${G.TINTS[g.band].edge} 0 45%,${tint.fill} 45%)"></span>${esc(tintLabel(g.band))} ${esc(T("band_word"))}</li>` : ""}
                </ul>
                ${p.euroCode ? `<div class="code-line">${esc(T("euro_code_label"))} ${esc(p.euroCode)}</div>` : ""}
                <div class="product-foot">
                    <div class="price">${p.price ? fmt(p.price) + " <small>EGP</small>" : `<small>${esc(T("price_on_request"))}</small>`}</div>
                    <button class="btn btn-line btn-sm add-quote" data-id="${p.id}" aria-pressed="${inList}">${inList ? esc(T("in_quote_list")) : esc(T("add_to_quote"))}</button>
                </div>
            </div>
        </article>`;
    }

    function renderPager(pages) {
        if (pages <= 1) { $("pager").innerHTML = ""; return; }
        const cur = state.page, out = [];
        const btn = (n, label, isNext, dis) => `<button data-page="${n}" ${n === cur && !label ? 'aria-current="page"' : ""} ${dis ? "disabled" : ""} ${label ? `aria-label="${esc(label)}"` : ""}>${label ? (isNext ? "›" : "‹") : n}</button>`;
        out.push(btn(cur - 1, T("previous_page"), false, cur === 1));
        const set = new Set([1, pages, cur - 1, cur, cur + 1].filter(n => n >= 1 && n <= pages));
        let prev = 0;
        [...set].sort((a, b) => a - b).forEach(n => { if (n - prev > 1) out.push("<span>…</span>"); out.push(btn(n)); prev = n; });
        out.push(btn(cur + 1, T("next_page"), true, cur === pages));
        $("pager").innerHTML = out.join("");
    }

    function render(scroll) {
        const toks = tokens();
        let list = items.filter(i => matches(i, null, toks));
        if (state.sort === "price-asc") list = list.slice().sort((a, b) => (a.p.price || 1e9) - (b.p.price || 1e9));
        if (state.sort === "price-desc") list = list.slice().sort((a, b) => (b.p.price || 0) - (a.p.price || 0));
        const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
        if (state.page > pages) state.page = pages;
        const start = (state.page - 1) * PER_PAGE;

        $("count").innerHTML = list.length
            ? `${fmt(list.length)} ${esc(T("glass_count_tail"))} <small>${esc(T("showing_word"))} ${fmt(start + 1)}–${fmt(Math.min(start + PER_PAGE, list.length))}</small>`
            : esc(T("no_matching_glass"));
        $("grid").innerHTML = list.length ? list.slice(start, start + PER_PAGE).map(card).join("") :
            `<div class="empty" style="grid-column:1/-1"><h3>${esc(T("no_match_h3"))}</h3>
             <p>${esc(T("no_match_p"))}</p>
             <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button class="btn btn-navy" data-clear="all">${esc(T("clear_filters_btn"))}</button><a class="btn btn-line" href="tel:+201201222047">${esc(T("call_btn"))} +20 120 122 2047</a></div></div>`;
        renderPager(pages);
        renderFacets(toks);
        renderActive();
        renderBanner();
        $("sort").value = state.sort;
        syncUrl();
        if (scroll) $("results").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // ---- Quote list (kept in this browser) ----
    let quote = {};
    try { quote = JSON.parse(localStorage.getItem("asg-quote") || "{}") || {}; } catch (e) { quote = {}; }
    Object.keys(quote).forEach(id => { if (!byId.has(id)) delete quote[id]; });
    function saveQuote() { try { localStorage.setItem("asg-quote", JSON.stringify(quote)); } catch (e) { /* storage unavailable */ } }

    function renderQuote() {
        const ids = Object.keys(quote);
        const n = ids.reduce((s, id) => s + quote[id], 0);
        $("quote-count").textContent = n;
        let total = 0;
        $("quote-list").innerHTML = ids.length ? ids.map(id => {
            const i = byId.get(id); total += (i.p.price || 0) * quote[id];
            return `<div class="q-item">${G.productSVG(i.p)}
                <div><b>${esc(brands[i.key].name)} ${esc(i.p.model)}</b><small>${esc(i.title)} · ${i.type ? esc(T(i.type === "Laminated" ? "type_laminated" : "type_tempered")) : "Glass"}, ${esc(tintLabel(i.glass.tint))}</small><br>
                <button class="q-remove" data-remove="${id}">${esc(T("remove_btn"))}</button></div>
                <div class="qty"><button data-qty="${id}" data-d="-1" aria-label="${esc(T("one_less"))}">−</button><span>${quote[id]}</span><button data-qty="${id}" data-d="1" aria-label="${esc(T("one_more"))}">+</button></div>
            </div>`;
        }).join("") : `<p class="drawer-empty">${esc(T("quote_empty"))}</p>`;
        $("quote-total").textContent = fmt(total) + " EGP";
        $("quote-send").disabled = !ids.length;
    }

    function setDrawer(open) {
        $("drawer").classList.toggle("open", open);
        $("drawer").setAttribute("aria-hidden", !open);
        $("scrim").classList.toggle("show", open || $("filters").classList.contains("open"));
        if (open) $("quote-close").focus();
    }
    function setFilters(open) {
        $("filters").classList.toggle("open", open);
        $("scrim").classList.toggle("show", open);
    }

    // ---- Events ----
    document.addEventListener("click", e => {
        const t = e.target;
        const c = t.closest(".chip");
        if (c) { const g = c.dataset.group; state[g] = state[g] === c.dataset.value ? "" : c.dataset.value; state.page = 1; render(); return; }
        const opt = t.closest(".brand-opt");
        if (opt && opt.dataset.model !== undefined) { state.model = opt.dataset.model; state.page = 1; render(); if (window.innerWidth <= 960) setFilters(false); return; }
        if (opt && opt.dataset.brand !== undefined) { state.brand = opt.dataset.brand; state.model = ""; state.page = 1; render(); if (window.innerWidth <= 960) setFilters(false); return; }
        const clr = t.closest("[data-clear]");
        if (clr) {
            const k = clr.dataset.clear;
            if (k === "all") Object.assign(state, { q: "", brand: "", model: "", cat: "", type: "", tint: "" });
            else if (k === "brand") Object.assign(state, { brand: "", model: "" });
            else state[k] = "";
            if (k === "q" || k === "all") $("q").value = "";
            state.page = 1; render(); return;
        }
        const pg = t.closest("[data-page]");
        if (pg && !pg.disabled) { state.page = +pg.dataset.page; render(true); return; }
        const add = t.closest(".add-quote");
        if (add) {
            const id = add.dataset.id;
            if (quote[id]) delete quote[id]; else quote[id] = 1;
            add.setAttribute("aria-pressed", !!quote[id]);
            add.textContent = quote[id] ? T("in_quote_list") : T("add_to_quote");
            saveQuote(); renderQuote(); return;
        }
        const q = t.closest("[data-qty]");
        if (q) { const id = q.dataset.qty; quote[id] = Math.max(1, quote[id] + +q.dataset.d); saveQuote(); renderQuote(); return; }
        const rm = t.closest("[data-remove]");
        if (rm) { delete quote[rm.dataset.remove]; saveQuote(); renderQuote(); render(); return; }
    });

    $("quote-open").addEventListener("click", () => setDrawer(true));
    $("quote-close").addEventListener("click", () => setDrawer(false));
    $("filters-open").addEventListener("click", () => setFilters(true));
    $("filters-close").addEventListener("click", () => setFilters(false));
    $("scrim").addEventListener("click", () => { setDrawer(false); setFilters(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") { setDrawer(false); setFilters(false); } });

    // ---- Categorized search suggestions: Brands / Model / Glass part ----
    const MAX_PER_GROUP = 5;
    let activeIdx = -1, lastOpts = [];

    function buildSuggestions(raw) {
        const q = norm(raw);
        if (!q) return [];
        const groups = [];

        const brandMatches = brandKeys
            .filter(k => norm(brands[k].name).includes(q))
            .slice(0, MAX_PER_GROUP)
            .map(k => ({ group: "brand", label: brands[k].name, apply: () => { state.brand = k; state.model = ""; state.q = ""; } }));
        if (brandMatches.length) groups.push({ key: "search_group_brands", opts: brandMatches });

        const modelMatches = modelList
            .filter(m => norm(m.model).includes(q) || norm(m.brand + " " + m.model).includes(q))
            .slice(0, MAX_PER_GROUP)
            .map(m => ({ group: "model", label: `${m.brand} ${m.model}`, apply: () => { state.brand = m.key; state.model = m.model; state.q = ""; } }));
        if (modelMatches.length) groups.push({ key: "search_group_models", opts: modelMatches });

        const partMatches = CATS
            .filter(([catKey]) => norm(T(CATS.find(c => c[0] === catKey)[1])).includes(q) || norm(CAT_WORDS[catKey]).includes(q))
            .slice(0, MAX_PER_GROUP)
            .map(([catKey, labelKey]) => ({ group: "part", label: T(labelKey), apply: () => { state.cat = catKey; state.q = ""; } }));
        if (partMatches.length) groups.push({ key: "search_group_parts", opts: partMatches });

        return groups;
    }

    function flatOpts(groups) { return groups.reduce((a, g) => a.concat(g.opts), []); }

    function renderSuggestions(groups) {
        const box = $("q-suggest");
        lastOpts = flatOpts(groups);
        activeIdx = -1;
        if (!groups.length) {
            box.innerHTML = state.q ? `<div class="sg-empty">${esc(T("search_no_suggest"))}</div>` : "";
            box.hidden = !state.q;
            $("q").setAttribute("aria-expanded", String(!!state.q));
            return;
        }
        box.innerHTML = groups.map(g => `
            <div class="sg-group">
                <div class="sg-label">${esc(T(g.key))}</div>
                ${g.opts.map((o, gi) => {
                    const flatIdx = lastOpts.indexOf(o);
                    return `<button type="button" class="sg-opt" data-idx="${flatIdx}">${esc(o.label)}</button>`;
                }).join("")}
            </div>`).join("");
        box.hidden = false;
        $("q").setAttribute("aria-expanded", "true");
    }

    function closeSuggestions() {
        $("q-suggest").hidden = true;
        $("q").setAttribute("aria-expanded", "false");
        activeIdx = -1;
    }

    function pickSuggestion(opt) {
        if (!opt) return;
        opt.apply();
        state.page = 1;
        $("q").value = state.q;
        closeSuggestions();
        render();
    }

    function highlightActive() {
        $("q-suggest").querySelectorAll(".sg-opt").forEach(b => b.classList.toggle("active", Number(b.dataset.idx) === activeIdx));
    }

    let timer;
    $("q").value = state.q;
    $("q").addEventListener("input", e => {
        clearTimeout(timer);
        const val = e.target.value;
        timer = setTimeout(() => {
            renderSuggestions(buildSuggestions(val));
            state.q = val.trim(); state.page = 1; render();
        }, 200);
    });
    $("q").addEventListener("keydown", e => {
        if ($("q-suggest").hidden && e.key !== "Enter") return;
        if (e.key === "ArrowDown") { e.preventDefault(); if (lastOpts.length) { activeIdx = (activeIdx + 1) % lastOpts.length; highlightActive(); } }
        else if (e.key === "ArrowUp") { e.preventDefault(); if (lastOpts.length) { activeIdx = (activeIdx - 1 + lastOpts.length) % lastOpts.length; highlightActive(); } }
        else if (e.key === "Enter") { if (activeIdx >= 0 && lastOpts[activeIdx]) { e.preventDefault(); pickSuggestion(lastOpts[activeIdx]); } else closeSuggestions(); }
        else if (e.key === "Escape") { closeSuggestions(); }
    });
    $("q-suggest").addEventListener("click", e => {
        const btn = e.target.closest(".sg-opt");
        if (btn) pickSuggestion(lastOpts[Number(btn.dataset.idx)]);
    });
    document.addEventListener("mousedown", e => {
        if (!e.target.closest(".searchbar")) closeSuggestions();
    });
    $("brand-search").addEventListener("input", () => renderBrandList());
    $("model-search").addEventListener("input", () => renderModelList());
    $("sort").addEventListener("change", e => { state.sort = e.target.value; state.page = 1; render(); });

    $("quote-form").addEventListener("submit", e => {
        e.preventDefault();
        const name = $("q-name").value.trim(), phone = $("q-phone").value.trim();
        if (!name || !phone) { (name ? $("q-phone") : $("q-name")).focus(); return; }
        const lines = Object.keys(quote).map((id, n) => {
            const i = byId.get(id);
            return `${n + 1}. ${brands[i.key].name} ${i.p.model} – ${i.title} – ${i.type || "Glass"}, ${G.TINTS[i.glass.tint].label}` +
                `${i.glass.band ? " with " + G.TINTS[i.glass.band].label.toLowerCase() + " band" : ""}${i.p.euroCode ? " – Euro " + i.p.euroCode : ""} – qty ${quote[id]} – ${i.p.price ? fmt(i.p.price) + " EGP" : "price on request"}`;
        });
        const msg = `Quote request (${lines.length} part${lines.length === 1 ? "" : "s"})\n\nName: ${name}\nPhone: ${phone}\n\nParts:\n${lines.join("\n")}\n\nEstimated total: ${$("quote-total").textContent}`;
        window.open(`https://wa.me/201201222047?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    });

    // Nav
    const toggle = $("nav-toggle"), menu = $("nav-menu");
    toggle.addEventListener("click", () => { const o = menu.classList.toggle("open"); toggle.setAttribute("aria-expanded", o); });
    const nav = $("navbar");
    window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 10), { passive: true });
    $("year").textContent = new Date().getFullYear();

    function renderSub() {
        $("shop-sub").textContent = `${fmt(items.length)} ${T("parts_for_brands", { brands: brandKeys.length })}`;
    }
    renderSub();
    renderQuote();
    render();

    document.addEventListener("asg:langchange", () => { renderSub(); render(); renderQuote(); });
})();
