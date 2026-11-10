// ASG language switch: English / Arabic
(function () {
    "use strict";

    const translations = {
        en: {
            skip_link: "Skip to content", skip_to_results: "Skip to results",
            nav_products: "Products", nav_glass_guide: "Glass guide", nav_about: "About",
            nav_services: "Services", nav_shop: "Shop", nav_contact: "Contact",
            nav_call_aria: "Call our hotline", nav_whatsapp_aria: "Chat with us on WhatsApp", whatsapp_label: "WhatsApp",

            hero_h1: "Safety glass for every car on Egypt's roads",
            hero_lede: "Laminated windshields and tempered side and rear glass, made by Aman Safety Glass Group since 1990. Pick your car to see the glass we stock for it.",
            finder_title: "Find glass for your vehicle",
            finder_brand_label: "Brand", finder_all_brands: "All brands",
            finder_cat_label: "Glass", finder_any_part: "Any part",
            finder_search_label: "Brand, model or glass part", finder_search_placeholder: "e.g. Toyota, Hiace, or Windshield",
            opt_windshield: "Windshield", opt_side_window: "Side and door windows",
            opt_rear_window: "Rear window (backlight)", opt_other_glass: "Other glass",
            finder_submit: "Show glass",
            finder_note_pre: "Not sure which part you need? Call",
            finder_note_or: "or WhatsApp",
            finder_note_post: "with your car's model and year.",

            fact1_b: "Since 1990", fact1_s: "making automotive glass",
            fact2_b: "3", fact2_s: "manufacturing factories",
            fact3_s: "glass parts in the catalog", fact4_s: "vehicle brands covered",

            brands_title: "From Toyota to Tatra", brands_browse: "Browse all brands",

            range_title: "Our glass range",
            range_lede: "Every piece is matched to a specific make, model and year, in the tints the original car came with.",
            range_windshield_title: "Windshields",
            range_windshield_text: "Laminated, with clear, green, blue or grey shade bands. Right- and left-hand variants for buses and trucks.",
            range_side_title: "Door and side windows",
            range_side_text: "Tempered front and rear door glass, vents and side panels.",
            range_rear_title: "Rear windows",
            range_rear_text: "Tempered backlights in clear, green, grey and bronze.",
            range_other_title: "Other glass",
            range_other_text: "Fixed and floor glass, bus panels and special shapes.",
            range_parts_suffix: "parts",

            glass_title: "Laminated or tempered?",
            glass_lede: "Cars use two kinds of safety glass. Knowing which one a part is helps you order the right replacement.",
            lam_h3: "Laminated glass",
            lam_li1: "Two layers of glass bonded to a plastic (PVB) interlayer.",
            lam_li2: "When hit, it cracks but stays in one piece, held together by the interlayer.",
            lam_li3: "Can carry a tinted shade band across the top to cut glare.",
            lam_uses_pre: "Used for windshields. Catalog code",
            tem_h3: "Tempered glass",
            tem_li1: "A single sheet heated and rapidly cooled, which makes it much stronger than ordinary glass.",
            tem_li2: "When it breaks, it shatters into small, blunt pieces instead of sharp shards.",
            tem_li3: "Made on our TAMGLASS ScreenMax tempering line.",
            tem_uses_pre: "Used for door, side, vent and rear windows. Catalog code",
            codes_h3: "Reading tint codes in the shop",
            code_cl: "Clear", code_gn: "Green", code_gy: "Grey", code_br: "Bronze", code_bl: "Blue",
            code_sh: "Shade band at the top", tint_privacy: "Privacy",
            spec_shade_band: "Green shade band", spec_laminated: "Laminated, PVB interlayer", spec_green_tint: "Green tint",
            cat_windshield: "Windshield", cat_side: "Door and side", cat_rear: "Rear window", cat_other: "Other",
            type_laminated: "Laminated", type_tempered: "Tempered", band_word: "band",

            about_title: "About ASG",
            about_lede: "Aman Safety Glass Group has made automotive safety glass since 1990.",
            about_p1: "We produce laminated windshields and tempered glass for passenger cars, pickups, minibuses, buses and trucks. Our factories run TAMGLASS ScreenMax tempering technology, and every product is made to meet international safety standards.",
            about_p2: "Workshops, fleet operators and car owners order from a catalog of more than 16,000 parts, each one listed by make, model, year, position and tint.",
            timeline1_b: "1990", timeline1_s: "Aman Safety Glass Group founded",
            timeline2_b: "3 factories", timeline2_s: "Laminating, tempering and glass processing",
            timeline3_b: "TAMGLASS ScreenMax", timeline3_s: "Tempering technology for strong, even glass",
            timeline4_b: "Cars to trucks", timeline4_s: "Passenger cars, buses, minibuses and heavy vehicles",

            services_title: "What we do",
            services_lede: "From replacement parts for a single car to supply contracts for fleets and industry.",
            svc1_h3: "Tempered glass production",
            svc1_p: "High-strength tempered glass made on TAMGLASS ScreenMax technology.",
            svc1_li1: "Automotive tempered glass", svc1_li2: "Architectural safety glass",
            svc1_li3: "Custom sizes", svc1_li4: "Quality testing and certification",
            svc2_h3: "Automotive glass",
            svc2_p: "Replacement glass built to OEM specifications and international safety standards.",
            svc2_li1: "Windshields", svc2_li2: "Side and rear windows",
            svc2_li3: "Sunroof glass", svc2_li4: "Bus and truck glass",
            svc3_h3: "Industrial glass processing",
            svc3_p: "Cutting, edging, drilling and tempering for industrial applications.",
            svc3_li1: "Precision cutting", svc3_li2: "Edge processing",
            svc3_li3: "Drilling and notching", svc3_li4: "Heat treatment",

            contact_title: "Get a quote",
            contact_lede: "Tell us the car and the part. We'll reply with price, availability and delivery time.",
            hotline_label: "Hotline", email_label: "Email", location_label: "Location",
            location_value: "Industrial Zone, 6th of October, Egypt",
            form_name: "Name", form_phone: "Phone",
            form_car: "Car make, model and year", form_car_placeholder: "e.g. Toyota Corolla 2018",
            form_part: "Part",
            opt_front_door: "Front door glass", opt_rear_door: "Rear door glass",
            opt_vent_side: "Vent or side glass", opt_other_unsure: "Other / not sure",
            form_message: "Message", form_message_placeholder: "Quantity, tint, anything else we should know",
            form_submit: "Send request",
            form_hint: "Opens your email app with the details filled in.",
            status_missing: "Add your name and phone number so we can reply.",
            status_ok: "Your email app should open with the request ready to send.",

            footer_tagline: "Aman Safety Glass Group. Automotive safety glass since 1990.",
            footer_company_h4: "Company", footer_shop_h4: "Shop", footer_contact_h4: "Contact",
            footer_windshields: "Windshields", footer_side_windows: "Side windows",
            footer_rear_windows: "Rear windows", footer_all_brands: "All brands",
            footer_location: "Industrial Zone, 6th of October, Egypt",
            footer_rights: "All rights reserved.",
            footer_brand_note: "Vehicle brand names and logos belong to their owners and are used only to identify compatibility.",

            shop_h1: "Find your glass",
            shop_sub_static: "Search by brand, model, year, part or Euro code.",
            search_placeholder: "Model, part or Euro code, e.g. hiace backlight", search_sr: "Search glass",
            search_group_brands: "Brands", search_group_models: "Model", search_group_parts: "Glass part", search_no_suggest: "No matches — press Enter to search all results",
            filter_part: "Glass part", filter_type: "Glass type", filter_tint: "Tint", filter_brand: "Brand",
            filter_model: "Model", model_search_placeholder: "Filter models", all_models_short: "All models",
            pick_brand_first: "Pick a brand to see its models.",
            brand_search_placeholder: "Filter brands",
            filters_btn: "Filters", filters_close: "Close filters",
            sort_sr: "Sort by", sort_relevance: "Sort: brand and model",
            sort_price_asc: "Price: low to high", sort_price_desc: "Price: high to low",
            quote_list_btn: "Quote list", quote_list_h2: "Quote list", quote_close: "Close quote list",
            quote_total_label: "Estimated total", quote_name_label: "Your name", quote_phone_label: "Phone",
            quote_send_btn: "Send quote request on WhatsApp", quote_call_btn: "Or call",
            quote_hint: "Prices are list prices. We confirm price, availability and delivery time when we reply.",

            loading_catalog: "Loading the catalog…", no_matching_glass: "No matching glass",
            add_to_quote: "Add to quote", in_quote_list: "In quote list",
            no_brand_match: "No brand matches", clear_all: "Clear all", remove_filter: "Remove filter",
            previous_page: "Previous page", next_page: "Next page",
            quote_empty: "Your quote list is empty. Use “Add to quote” on any part, then send the whole list in one request.",
            no_match_h3: "No glass matches these filters",
            no_match_p: "Try fewer words, or remove a filter. If your car isn't listed, call us and we'll check stock.",
            clear_filters_btn: "Clear filters", call_btn: "Call",
            one_less: "One less", one_more: "One more", remove_btn: "Remove",
            all_brands_short: "All brands", euro_code_label: "Euro code",
            tint_on_request: "Tint on request", price_on_request: "Price on request",
            glass_count_tail: "glass parts", showing_word: "showing",
            parts_for_brands: "parts for {brands} brands. Search by brand, model, year, part or Euro code."
        },
        ar: {
            skip_link: "تخطي إلى المحتوى", skip_to_results: "تخطي إلى النتائج",
            nav_products: "المنتجات", nav_glass_guide: "دليل الزجاج", nav_about: "عن الشركة",
            nav_services: "خدماتنا", nav_shop: "المتجر", nav_contact: "تواصل معنا",
            nav_call_aria: "اتصل بالخط الساخن", nav_whatsapp_aria: "تواصل معنا عبر واتساب", whatsapp_label: "واتساب",

            hero_h1: "زجاج أمان لكل سيارة على طرق مصر",
            hero_lede: "زجاج أمامي لامينيتد وزجاج جانبي وخلفي مقسّى، تصنعه مجموعة أمان للزجاج الأمني منذ عام 1990. اختر سيارتك لمعرفة الزجاج المتوفر لها.",
            finder_title: "ابحث عن زجاج سيارتك",
            finder_brand_label: "الماركة", finder_all_brands: "كل الماركات",
            finder_cat_label: "نوع الزجاج", finder_any_part: "أي قطعة",
            finder_search_label: "الماركة أو الموديل أو قطعة الزجاج", finder_search_placeholder: "مثل Toyota أو Hiace أو Windshield",
            opt_windshield: "الزجاج الأمامي", opt_side_window: "نوافذ جانبية وأبواب",
            opt_rear_window: "الزجاج الخلفي (اللونة)", opt_other_glass: "زجاج آخر",
            finder_submit: "عرض الزجاج",
            finder_note_pre: "لست متأكدًا من القطعة المطلوبة؟ اتصل على",
            finder_note_or: "أو راسلنا على واتساب",
            finder_note_post: "وأخبرنا بموديل سيارتك وسنة الصنع.",

            fact1_b: "منذ 1990", fact1_s: "في تصنيع زجاج السيارات",
            fact2_b: "3", fact2_s: "مصانع تصنيع",
            fact3_s: "قطعة زجاج في الكتالوج", fact4_s: "ماركة سيارات مغطاة",

            brands_title: "من تويوتا إلى تاترا", brands_browse: "تصفح جميع الماركات",

            range_title: "مجموعة الزجاج لدينا",
            range_lede: "كل قطعة مطابقة لماركة وموديل وسنة صنع محددة، بنفس درجات التظليل الأصلية للسيارة.",
            range_windshield_title: "الزجاج الأمامي",
            range_windshield_text: "زجاج لامينيتد بدرجات تظليل شفاف أو أخضر أو أزرق أو رمادي. يتوفر بنسختين يمين وشمال للباصات والشاحنات.",
            range_side_title: "نوافذ الأبواب والجوانب",
            range_side_text: "زجاج مقسّى للأبواب الأمامية والخلفية والفتحات والألواح الجانبية.",
            range_rear_title: "النوافذ الخلفية",
            range_rear_text: "لونات خلفية مقسّاة بدرجات شفاف وأخضر ورمادي وبرونزي.",
            range_other_title: "زجاج آخر",
            range_other_text: "زجاج ثابت وزجاج الأرضية وألواح الباصات والأشكال الخاصة.",
            range_parts_suffix: "قطعة",

            glass_title: "لامينيتد أم مقسّى؟",
            glass_lede: "تستخدم السيارات نوعين من زجاج الأمان. معرفة نوع القطعة تساعدك على طلب البديل الصحيح.",
            lam_h3: "الزجاج اللامينيتد",
            lam_li1: "طبقتان من الزجاج مرتبطتان بطبقة بلاستيكية (PVB) بينهما.",
            lam_li2: "عند الكسر يتشقق لكنه يبقى قطعة واحدة بفضل الطبقة الداخلية.",
            lam_li3: "قد يحمل شريط تظليل في الأعلى للحد من الوهج.",
            lam_uses_pre: "يُستخدم للزجاج الأمامي. كود الكتالوج",
            tem_h3: "الزجاج المقسّى",
            tem_li1: "لوح واحد يتم تسخينه وتبريده سريعًا، مما يجعله أقوى بكثير من الزجاج العادي.",
            tem_li2: "عند كسره يتحطم إلى قطع صغيرة غير حادة بدلًا من شظايا حادة.",
            tem_li3: "يُصنع على خط التقسية TAMGLASS ScreenMax لدينا.",
            tem_uses_pre: "يُستخدم لنوافذ الأبواب والجوانب والفتحات والخلفية. كود الكتالوج",
            codes_h3: "قراءة أكواد التظليل في المتجر",
            code_cl: "شفاف", code_gn: "أخضر", code_gy: "رمادي", code_br: "برونزي", code_bl: "أزرق",
            code_sh: "شريط تظليل في الأعلى", tint_privacy: "عازل للرؤية",
            spec_shade_band: "شريط تظليل أخضر", spec_laminated: "لامينيتد بطبقة PVB داخلية", spec_green_tint: "تظليل أخضر",
            cat_windshield: "الزجاج الأمامي", cat_side: "الأبواب والجوانب", cat_rear: "الزجاج الخلفي", cat_other: "أخرى",
            type_laminated: "لامينيتد", type_tempered: "مقسّى", band_word: "شريط",

            about_title: "عن ASG",
            about_lede: "تصنع مجموعة أمان للزجاج الأمني زجاج أمان السيارات منذ عام 1990.",
            about_p1: "نصنع زجاجًا أماميًا لامينيتد وزجاجًا مقسّى للسيارات والأنصاف نقل والميكروباص والأتوبيسات والشاحنات. تعمل مصانعنا بتقنية تقسية TAMGLASS ScreenMax، ويُصنع كل منتج وفق المعايير الدولية للسلامة.",
            about_p2: "تطلب الورش وأصحاب الأساطيل وملاك السيارات من كتالوج يضم أكثر من 16,000 قطعة، كل قطعة مصنفة حسب الماركة والموديل وسنة الصنع والموضع والتظليل.",
            timeline1_b: "1990", timeline1_s: "تأسيس مجموعة أمان للزجاج الأمني",
            timeline2_b: "3 مصانع", timeline2_s: "التصفيح والتقسية ومعالجة الزجاج",
            timeline3_b: "TAMGLASS ScreenMax", timeline3_s: "تقنية تقسية لزجاج قوي ومتجانس",
            timeline4_b: "من السيارات إلى الشاحنات", timeline4_s: "سيارات ركاب وأتوبيسات وميكروباص ومركبات ثقيلة",

            services_title: "ماذا نقدم",
            services_lede: "من قطع غيار لسيارة واحدة إلى عقود توريد للأساطيل والصناعة.",
            svc1_h3: "تصنيع الزجاج المقسّى",
            svc1_p: "زجاج مقسّى عالي القوة يُصنع بتقنية TAMGLASS ScreenMax.",
            svc1_li1: "زجاج مقسّى للسيارات", svc1_li2: "زجاج أمان للمباني",
            svc1_li3: "مقاسات خاصة", svc1_li4: "فحص وشهادات جودة",
            svc2_h3: "زجاج السيارات",
            svc2_p: "زجاج بديل مصنّع وفق مواصفات الشركة المصنعة والمعايير الدولية للسلامة.",
            svc2_li1: "الزجاج الأمامي", svc2_li2: "النوافذ الجانبية والخلفية",
            svc2_li3: "زجاج فتحة السقف", svc2_li4: "زجاج الأتوبيسات والشاحنات",
            svc3_h3: "معالجة الزجاج الصناعي",
            svc3_p: "قطع وتشطيب وتثقيب وتقسية للتطبيقات الصناعية.",
            svc3_li1: "قطع دقيق", svc3_li2: "معالجة الحواف",
            svc3_li3: "تثقيب وتفريز", svc3_li4: "معالجة حرارية",

            contact_title: "اطلب عرض سعر",
            contact_lede: "أخبرنا بالسيارة والقطعة المطلوبة، وسنرد عليك بالسعر والتوافر ووقت التسليم.",
            hotline_label: "الخط الساخن", email_label: "البريد الإلكتروني", location_label: "الموقع",
            location_value: "المنطقة الصناعية، 6 أكتوبر، مصر",
            form_name: "الاسم", form_phone: "رقم الهاتف",
            form_car: "ماركة وموديل وسنة السيارة", form_car_placeholder: "مثال: تويوتا كورولا 2018",
            form_part: "القطعة",
            opt_front_door: "زجاج الباب الأمامي", opt_rear_door: "زجاج الباب الخلفي",
            opt_vent_side: "زجاج الفتحة أو الجانب", opt_other_unsure: "أخرى / غير متأكد",
            form_message: "الرسالة", form_message_placeholder: "الكمية، التظليل، أي تفاصيل أخرى تريد إخبارنا بها",
            form_submit: "إرسال الطلب",
            form_hint: "سيفتح هذا تطبيق البريد الإلكتروني مع تعبئة التفاصيل.",
            status_missing: "أضف اسمك ورقم هاتفك لنتمكن من الرد.",
            status_ok: "يجب أن يفتح تطبيق البريد الإلكتروني مع الطلب جاهزًا للإرسال.",

            footer_tagline: "مجموعة أمان للزجاج الأمني. زجاج أمان سيارات منذ عام 1990.",
            footer_company_h4: "الشركة", footer_shop_h4: "المتجر", footer_contact_h4: "تواصل معنا",
            footer_windshields: "الزجاج الأمامي", footer_side_windows: "النوافذ الجانبية",
            footer_rear_windows: "النوافذ الخلفية", footer_all_brands: "كل الماركات",
            footer_location: "المنطقة الصناعية، 6 أكتوبر، مصر",
            footer_rights: "جميع الحقوق محفوظة.",
            footer_brand_note: "أسماء وشعارات ماركات السيارات مملوكة لأصحابها، وتُستخدم فقط لتحديد التوافق.",

            shop_h1: "ابحث عن زجاجك",
            shop_sub_static: "ابحث بالماركة أو الموديل أو السنة أو القطعة أو الكود الأوروبي.",
            search_placeholder: "الموديل أو القطعة أو الكود الأوروبي، مثل hiace backlight", search_sr: "بحث عن زجاج",
            search_group_brands: "الماركات", search_group_models: "الموديل", search_group_parts: "قطعة الزجاج", search_no_suggest: "لا توجد نتائج مطابقة — اضغط Enter للبحث في كل النتائج",
            filter_part: "قطعة الزجاج", filter_type: "نوع الزجاج", filter_tint: "التظليل", filter_brand: "الماركة",
            filter_model: "الموديل", model_search_placeholder: "تصفية الموديلات", all_models_short: "كل الموديلات",
            pick_brand_first: "اختر ماركة لعرض موديلاتها.",
            brand_search_placeholder: "تصفية الماركات",
            filters_btn: "الفلاتر", filters_close: "إغلاق الفلاتر",
            sort_sr: "ترتيب حسب", sort_relevance: "الترتيب: الماركة والموديل",
            sort_price_asc: "السعر: من الأقل للأعلى", sort_price_desc: "السعر: من الأعلى للأقل",
            quote_list_btn: "قائمة عرض السعر", quote_list_h2: "قائمة عرض السعر", quote_close: "إغلاق قائمة عرض السعر",
            quote_total_label: "الإجمالي التقديري", quote_name_label: "اسمك", quote_phone_label: "رقم الهاتف",
            quote_send_btn: "إرسال طلب عرض السعر عبر واتساب", quote_call_btn: "أو اتصل بـ",
            quote_hint: "الأسعار أسعار قائمة. سنؤكد السعر والتوافر ووقت التسليم عند الرد.",

            loading_catalog: "جارٍ تحميل الكتالوج…", no_matching_glass: "لا يوجد زجاج مطابق",
            add_to_quote: "أضف لعرض السعر", in_quote_list: "في قائمة العرض",
            no_brand_match: "لا توجد ماركة تطابق", clear_all: "إزالة الكل", remove_filter: "إزالة الفلتر",
            previous_page: "الصفحة السابقة", next_page: "الصفحة التالية",
            quote_empty: "قائمة عرض السعر فارغة. استخدم «أضف لعرض السعر» على أي قطعة، ثم أرسل القائمة كاملة في طلب واحد.",
            no_match_h3: "لا يوجد زجاج يطابق هذه الفلاتر",
            no_match_p: "جرب كلمات أقل أو أزل فلترًا. إذا لم تجد سيارتك، اتصل بنا وسنتحقق من التوفر.",
            clear_filters_btn: "إزالة الفلاتر", call_btn: "اتصل",
            one_less: "أقل بواحد", one_more: "أكثر بواحد", remove_btn: "إزالة",
            all_brands_short: "كل الماركات", euro_code_label: "الكود الأوروبي",
            tint_on_request: "التظليل عند الطلب", price_on_request: "السعر عند الطلب",
            glass_count_tail: "قطعة زجاج", showing_word: "يعرض",
            parts_for_brands: "قطعة لـ {brands} ماركة. ابحث بالماركة أو الموديل أو السنة أو القطعة أو الكود الأوروبي."
        }
    };

    function t(key, vars) {
        const lang = document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
        let s = (translations[lang] && translations[lang][key]) || translations.en[key] || key;
        if (vars) Object.keys(vars).forEach(k => { s = s.replace("{" + k + "}", vars[k]); });
        return s;
    }

    function applyLang(lang) {
        if (lang !== "ar") lang = "en";
        document.documentElement.setAttribute("lang", lang);
        document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
        const dict = translations[lang];

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (dict[key]) el.textContent = dict[key];
        });
        document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
            const key = el.getAttribute("data-i18n-placeholder");
            if (dict[key]) el.setAttribute("placeholder", dict[key]);
        });
        document.querySelectorAll("[data-i18n-aria]").forEach(el => {
            const key = el.getAttribute("data-i18n-aria");
            if (dict[key]) el.setAttribute("aria-label", dict[key]);
        });

        try { localStorage.setItem("asg-lang", lang); } catch (e) { /* storage unavailable */ }
        document.querySelectorAll(".lang-btn").forEach(b => {
            const active = b.getAttribute("data-lang") === lang;
            b.classList.toggle("active", active);
            b.setAttribute("aria-pressed", active);
        });
        document.dispatchEvent(new CustomEvent("asg:langchange", { detail: { lang } }));
    }

    function initialLang() {
        // Arabic is temporarily disabled (translation needs a pass for grammar/vocab
        // fixes) - always start in English regardless of saved choice or browser
        // language. Re-enable by restoring the saved/navigator-language logic below.
        return "en";
        // try {
        //     const saved = localStorage.getItem("asg-lang");
        //     if (saved === "ar" || saved === "en") return saved;
        // } catch (e) { /* storage unavailable */ }
        // return (navigator.language || "").toLowerCase().startsWith("ar") ? "ar" : "en";
    }

    function init() {
        applyLang(initialLang());
        document.querySelectorAll(".lang-btn").forEach(b => {
            b.addEventListener("click", () => applyLang(b.getAttribute("data-lang")));
        });
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();

    window.ASG_I18N = { t, applyLang, get lang() { return document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en"; } };
})();
