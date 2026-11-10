// ASG home page
(function () {
    "use strict";
    const G = window.ASGGlass;
    const S = window.ASG_CATALOG_SUMMARY || { total: 16252, brands: [], categories: {} };
    const fmt = n => Number(n).toLocaleString("en-US");

    // ---- Navigation ----
    const navbar = document.getElementById("navbar");
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("nav-menu");
    toggle.addEventListener("click", () => {
        const open = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open);
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.addEventListener("click", e => {
        if (e.target.closest("a")) { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });
    const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

    // Highlight the section in view
    const links = [...document.querySelectorAll('.nav-link[href^="#"]')];
    const spy = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (!en.isIntersecting) return;
            links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
        });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(l => { const s = document.querySelector(l.getAttribute("href")); if (s) spy.observe(s); });

    // ---- Catalog numbers ----
    const totalEl = document.querySelector('[data-summary="total"]');
    if (totalEl && S.total) totalEl.textContent = fmt(Math.floor(S.total / 1000) * 1000) + "+";
    const brandsEl = document.querySelector('[data-summary="brands"]');
    if (brandsEl && S.brands.length) brandsEl.textContent = S.brands.length;

    // ---- Part finder: categorized search (Brands / Model / Glass part) ----
    const norm = s => (s || "").toLowerCase().replace(/[-_]/g, "");
    const MODELS = window.ASG_MODELS || [];
    const FINDER_CATS = [
        ["windshield", "opt_windshield"], ["side-window", "opt_side_window"],
        ["rear-window", "opt_rear_window"], ["other", "opt_other_glass"]
    ];
    const fq = document.getElementById("finder-q");
    const fBrand = document.getElementById("finder-brand");
    const fCat = document.getElementById("finder-cat");
    const fSuggest = document.getElementById("finder-suggest");
    const MAX_PER_GROUP = 5;
    let fOpts = [], fActive = -1;

    function buildFinderSuggestions(raw) {
        const q = norm(raw);
        if (!q) return [];
        const groups = [];

        const brandMatches = S.brands.filter(b => norm(b.name).includes(q)).slice(0, MAX_PER_GROUP)
            .map(b => ({ label: b.name, apply: () => { fBrand.value = b.key; fCat.value = ""; fq.value = b.name; } }));
        if (brandMatches.length) groups.push({ key: "search_group_brands", opts: brandMatches });

        const modelMatches = MODELS.filter(m => norm(m.m).includes(q) || norm(m.b + " " + m.m).includes(q)).slice(0, MAX_PER_GROUP)
            .map(m => ({ label: `${m.b} ${m.m}`, apply: () => { fBrand.value = m.k; fCat.value = ""; fq.value = m.m; } }));
        if (modelMatches.length) groups.push({ key: "search_group_models", opts: modelMatches });

        const partMatches = FINDER_CATS.filter(([, key]) => norm(T(key)).includes(q)).slice(0, MAX_PER_GROUP)
            .map(([val, key]) => ({ label: T(key), apply: () => { fCat.value = val; fBrand.value = ""; fq.value = ""; } }));
        if (partMatches.length) groups.push({ key: "search_group_parts", opts: partMatches });

        return groups;
    }

    function flatFinderOpts(groups) { return groups.reduce((a, g) => a.concat(g.opts), []); }

    function renderFinderSuggestions(groups) {
        fOpts = flatFinderOpts(groups);
        fActive = -1;
        if (!groups.length) {
            fSuggest.innerHTML = fq.value ? `<div class="sg-empty">${T("search_no_suggest")}</div>` : "";
            fSuggest.hidden = !fq.value;
            fq.setAttribute("aria-expanded", String(!!fq.value));
            return;
        }
        fSuggest.innerHTML = groups.map(g => `
            <div class="sg-group">
                <div class="sg-label">${T(g.key)}</div>
                ${g.opts.map(o => `<button type="button" class="sg-opt" data-idx="${fOpts.indexOf(o)}">${G.escapeHtml(o.label)}</button>`).join("")}
            </div>`).join("");
        fSuggest.hidden = false;
        fq.setAttribute("aria-expanded", "true");
    }

    function closeFinderSuggestions() { fSuggest.hidden = true; fq.setAttribute("aria-expanded", "false"); fActive = -1; }

    function pickFinderSuggestion(opt) {
        if (!opt) return;
        opt.apply();
        closeFinderSuggestions();
        document.getElementById("finder").requestSubmit ? document.getElementById("finder").requestSubmit() : document.getElementById("finder").submit();
    }

    function highlightFinderActive() {
        fSuggest.querySelectorAll(".sg-opt").forEach(b => b.classList.toggle("active", Number(b.dataset.idx) === fActive));
    }

    let fTimer;
    fq.addEventListener("input", () => {
        clearTimeout(fTimer);
        const val = fq.value;
        fBrand.value = ""; fCat.value = "";
        fTimer = setTimeout(() => renderFinderSuggestions(buildFinderSuggestions(val)), 150);
    });
    fq.addEventListener("keydown", e => {
        if (fSuggest.hidden && e.key !== "Enter") return;
        if (e.key === "ArrowDown") { e.preventDefault(); if (fOpts.length) { fActive = (fActive + 1) % fOpts.length; highlightFinderActive(); } }
        else if (e.key === "ArrowUp") { e.preventDefault(); if (fOpts.length) { fActive = (fActive - 1 + fOpts.length) % fOpts.length; highlightFinderActive(); } }
        else if (e.key === "Enter") { if (fActive >= 0 && fOpts[fActive]) { e.preventDefault(); pickFinderSuggestion(fOpts[fActive]); } else closeFinderSuggestions(); }
        else if (e.key === "Escape") { closeFinderSuggestions(); }
    });
    fSuggest.addEventListener("click", e => {
        const btn = e.target.closest(".sg-opt");
        if (btn) pickFinderSuggestion(fOpts[Number(btn.dataset.idx)]);
    });
    // Use mousedown (not click) so a tap on an overlapped element below the dropdown
    // (e.g. the submit button, which the open dropdown can visually cover on mobile)
    // closes the dropdown in time for the subsequent click to land on that element.
    document.addEventListener("mousedown", e => { if (!e.target.closest(".finder-search-field")) closeFinderSuggestions(); });

    document.getElementById("finder").addEventListener("submit", e => {
        e.preventDefault();
        const p = new URLSearchParams();
        if (fBrand.value) p.set("brand", fBrand.value);
        if (fCat.value) p.set("cat", fCat.value);
        if (!fBrand.value && !fCat.value && fq.value.trim()) p.set("q", fq.value.trim());
        location.href = "shop.html" + (p.toString() ? "?" + p : "");
    });

    // ---- Brand marquee (brands with logos, biggest catalogs first) ----
    const track = document.getElementById("brand-marquee");
    const withLogos = S.brands.filter(b => window.ASG_BRAND_LOGOS && window.ASG_BRAND_LOGOS[b.key])
        .sort((a, b) => b.count - a.count).slice(0, 40);
    const item = b => `<a href="shop.html?brand=${b.key}" title="${G.escapeHtml(b.name)} glass">
        <img src="${window.ASG_BRAND_LOGOS[b.key]}" alt="${G.escapeHtml(b.name)}" loading="lazy" decoding="async"></a>`;
    // Duplicate the row for a seamless loop; the copy is hidden from screen readers
    track.innerHTML = withLogos.map(item).join("") +
        `<span style="display:contents" aria-hidden="true">${withLogos.map(item).join("").replace(/<a /g, '<a tabindex="-1" ')}</span>`;

    // ---- Range cards ----
    const c = S.categories || {};
    const T = window.ASG_I18N ? window.ASG_I18N.t : (k => k);
    function renderRange() {
        const range = [
            { cat: "windshield", title: T("range_windshield_title"), text: T("range_windshield_text"), art: G.paneSVG("windshield", "green", "green", { label: "Windshield" }) },
            { cat: "side-window", title: T("range_side_title"), text: T("range_side_text"), art: G.paneSVG("front", "green", null, { label: "Door window" }) },
            { cat: "rear-window", title: T("range_rear_title"), text: T("range_rear_text"), art: G.paneSVG("backlight", "grey", null, { label: "Rear window" }) },
            { cat: "other", title: T("range_other_title"), text: T("range_other_text"), art: G.paneSVG("side", "clear", null, { label: "Other glass" }) }
        ];
        document.getElementById("range-grid").innerHTML = range.map(r => `
            <a class="range-card" href="shop.html?cat=${r.cat}">
                <div class="range-art">${r.art}</div>
                <div class="range-body">
                    <h3>${r.title}</h3>
                    <span class="count">${fmt(c[r.cat] || 0)} ${T("range_parts_suffix")}</span>
                    <p>${r.text}</p>
                </div>
            </a>`).join("");
    }
    renderRange();
    document.addEventListener("asg:langchange", renderRange);

    // ---- Contact form -> prefilled email ----
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", e => {
        e.preventDefault();
        const status = document.getElementById("form-status");
        const d = Object.fromEntries(new FormData(form));
        if (!d.name.trim() || !d.phone.trim()) {
            status.style.color = "#A3322A";
            status.textContent = T("status_missing");
            (d.name.trim() ? form.phone : form.name).focus();
            return;
        }
        const body = `Name: ${d.name}\nPhone: ${d.phone}\nCar: ${d.car || "-"}\nPart: ${d.part}\n\n${d.message || ""}`;
        location.href = `mailto:customer.service@amanglass.com?subject=${encodeURIComponent("Quote request: " + (d.car || d.part))}&body=${encodeURIComponent(body)}`;
        status.style.color = "";
        status.textContent = T("status_ok");
    });

    document.getElementById("year").textContent = new Date().getFullYear();
})();
