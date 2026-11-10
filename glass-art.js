/* ASG glass art + catalog helpers (shared by home and shop pages)
   Draws each glass part as a tinted SVG pane, so every product has a
   clear visual even before real product photos are added. */
(function () {
    "use strict";

    // Real automotive tint colours (approximate on-screen appearance)
    const TINTS = {
        clear:   { label: "Clear",   fill: "#DCEDF2", edge: "#A9C7D1" },
        green:   { label: "Green",   fill: "#A8D5C4", edge: "#6FAE98" },
        grey:    { label: "Grey",    fill: "#9AA3AC", edge: "#6E7781" },
        bronze:  { label: "Bronze",  fill: "#C9A27A", edge: "#9C7650" },
        blue:    { label: "Blue",    fill: "#9CC0E0", edge: "#6894BD" },
        privacy: { label: "Privacy", fill: "#4A525B", edge: "#30363D" }
    };

    const AR_COLOR = [
        [/ابيض/, "clear"], [/اخضر/, "green"], [/رماد/, "grey"], [/برونز/, "bronze"],
        [/ازرق/, "blue"], [/بريفسي/, "privacy"], [/اسود/, "privacy"]
    ];
    const EN_COLOR = { CL: "clear", GN: "green", GY: "grey", BR: "bronze", BL: "blue", CN: "clear" };

    // Decode the shorthand used in the catalog ("LAM. CL. SH. GN.", "سيكوريت اخضر" ...)
    function decodeGlass(p) {
        const code = (p.arabicColor || "").trim();
        let type = p.type || "";
        if (/سيكوريت/.test(code)) type = type || "Tempered";
        if (/تربلكس/.test(code)) type = type || "Laminated";
        let tint = null, band = null;

        if (/[؀-ۿ]/.test(code)) {
            const found = [];
            code.split(/[×*x]/).forEach(part => {
                for (const [re, key] of AR_COLOR) { if (re.test(part)) { found.push(key); break; } }
            });
            tint = found[0] || null;
            if (found[1] && found[1] !== found[0]) band = found[1];
        } else {
            const m = code.toUpperCase().replace(/\s+/g, " ");
            const shade = m.match(/SH\.?\s*([A-Z]{2})/);
            if (shade) band = EN_COLOR[shade[1]] || null;
            const main = m.replace(/SH\.?\s*[A-Z]{2}\.?/, "").match(/\b(CL|GN|GY|BR|BL|CN)\b/);
            if (main) tint = EN_COLOR[main[1]];
        }
        return { type: type || "Glass", tint: tint || "clear", band, tintKnown: !!tint };
    }

    const AR_PART = [
        [/برابريز/, "Windshield"], [/نظارة خلفي/, "Backlight"], [/نظارة/, "Backlight"],
        [/باب امامي/, "Front door"], [/باب خلفي/, "Rear door"], [/باب/, "Door"]
    ];

    // Category from the part (rear-door glass is a side window, not rear glass)
    function categoryOf(p) {
        switch (p.part) {
            case "Windshield": return "windshield";
            case "Backlight": return "rear-window";
            case "Other glass": return "other";
            default: return "side-window";
        }
    }

    function positionOf(p) {
        const c = (p.arabicPart || "").toUpperCase();
        // First token can be F./R. (front/rear); the side is a later R/L token
        let side = "";
        const tokens = c.split(/[.\s]+/).filter(Boolean);
        for (let i = 1; i < tokens.length; i++) {
            if (tokens[i] === "R") side = "Right";
            else if (tokens[i] === "L") side = "Left";
        }
        if (/يمين/.test(c)) side = "Right";
        if (/شمال|يسار/.test(c)) side = "Left";
        let detail = "";
        if (/VENT/.test(c)) detail = /F\. VENT/.test(c) ? "Front vent" : "Rear vent";
        else if (/SIDE\. ?(\d)/.test(c)) detail = "Side " + c.match(/SIDE\. ?(\d)/)[1];
        else if (/MAIN SIDE/.test(c)) detail = "Main side";
        else if (/SIDE\. F/.test(c)) detail = "Front side";
        else if (/BIG/.test(c)) detail = "Large";
        else if (/SMALL/.test(c)) detail = "Small";
        else if (/FLOOR/.test(c)) detail = "Fixed floor";
        else if (/FLAT/.test(c)) detail = "Flat";
        let partName = p.part;
        if (/[؀-ۿ]/.test(c)) {
            for (const [re, n] of AR_PART) { if (re.test(c)) { partName = partName || n; break; } }
        }
        return { side, detail, partName };
    }

    // Pane outlines in a 200 x 120 box (drawn for the right-hand side; mirrored for left)
    const SHAPES = {
        windshield: "M26 98 C70 106 130 106 174 98 L154 30 C120 22 80 22 46 30 Z",
        backlight:  "M30 90 C75 97 125 97 170 90 L158 38 C122 31 78 31 42 38 Z",
        front:      "M34 92 L166 92 L166 30 C130 26 104 30 84 40 C60 52 44 70 34 92 Z",
        rear:       "M34 92 L160 92 C162 72 160 52 150 30 L46 30 C40 50 36 70 34 92 Z",
        vent:       "M62 94 L150 94 L150 26 C112 42 82 64 62 94 Z",
        side:       "M38 30 H162 Q172 30 172 40 V84 Q172 94 162 94 H38 Q28 94 28 84 V40 Q28 30 38 30 Z",
        other:      "M44 36 H156 Q162 36 162 42 V88 Q162 94 156 94 H44 Q38 94 38 88 V42 Q38 36 44 36 Z"
    };

    function shapeFor(p) {
        const c = (p.arabicPart || "").toUpperCase();
        if (p.part === "Windshield") return "windshield";
        if (p.part === "Backlight") return "backlight";
        if (p.part === "Vent" || /VENT/.test(c)) return "vent";
        if (p.part === "Front door") return "front";
        if (p.part === "Rear door") return "rear";
        if (p.part === "Side") return "side";
        if (p.part === "Door") return "front";
        return "other";
    }

    let uid = 0;
    // Returns SVG markup for a glass pane
    function paneSVG(shape, tintKey, bandKey, opts) {
        opts = opts || {};
        const id = "g" + (++uid);
        const t = TINTS[tintKey] || TINTS.clear;
        const b = bandKey ? (TINTS[bandKey] || TINTS.green) : null;
        const d = SHAPES[shape] || SHAPES.other;
        const flip = opts.mirror ? ' transform="translate(200 0) scale(-1 1)"' : "";
        const frit = shape === "side" || shape === "other" ? 3 : 5;
        return `<svg class="pane" viewBox="0 0 200 120" role="img" aria-label="${opts.label || "Glass illustration"}">
  <defs>
    <linearGradient id="${id}f" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${t.fill}" stop-opacity=".95"/>
      <stop offset="1" stop-color="${t.edge}" stop-opacity=".95"/>
    </linearGradient>
    <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${b ? b.edge : "#000"}" stop-opacity=".95"/>
      <stop offset="1" stop-color="${b ? b.fill : "#000"}" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="${id}c"><path d="${d}"/></clipPath>
  </defs>
  <g${flip}>
    <path d="${d}" fill="url(#${id}f)"/>
    <g clip-path="url(#${id}c)">
      ${b ? `<rect x="0" y="0" width="200" height="${shape === "windshield" ? 48 : 44}" fill="url(#${id}b)"/>` : ""}
      <path d="M40 120 L110 0 L132 0 L62 120 Z" fill="#fff" opacity=".28"/>
      <path d="M74 120 L144 0 L152 0 L82 120 Z" fill="#fff" opacity=".22"/>
    </g>
    <path d="${d}" fill="none" stroke="#1E2430" stroke-width="${frit}" stroke-linejoin="round" opacity=".85"/>
  </g>
</svg>`;
    }

    function productSVG(p) {
        const g = decodeGlass(p);
        const pos = positionOf(p);
        return paneSVG(shapeFor(p), g.tint, g.band, {
            mirror: pos.side === "Left",
            label: `${p.part || "Glass"}, ${TINTS[g.tint].label.toLowerCase()} tint`
        });
    }

    function brandKey(brand) {
        return String(brand).trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-{2,}/g, "-").replace(/^-+|-+$/g, "");
    }

    function escapeHtml(str) {
        return String(str == null ? "" : str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    // Brand mark: logo image when we have a verified one, typographic badge otherwise
    function brandMark(name, key, cls) {
        key = key || brandKey(name);
        const src = window.ASG_BRAND_LOGOS && window.ASG_BRAND_LOGOS[key];
        if (src) {
            return `<span class="brand-mark ${cls || ""}"><img src="${src}" alt="${escapeHtml(name)}" loading="lazy" decoding="async"></span>`;
        }
        return `<span class="brand-mark brand-mark--text ${cls || ""}" aria-label="${escapeHtml(name)}"><span>${escapeHtml(name)}</span></span>`;
    }

    window.ASGGlass = { TINTS, SHAPES, decodeGlass, positionOf, categoryOf, shapeFor, paneSVG, productSVG, brandKey, escapeHtml, brandMark };
})();
