
    'use strict';

    /* ==========================================================
       1. MULTILINGUAL DICTIONARY (FR / AR / EN)
    ========================================================== */
    const I18N = {
      fr: {
      btn_unmute: "Activer le son",
      btn_mute: "Couper le son",
      hero_stat_sub: "Cadre haut standing à Hydra",
        
      reels_badge: "Vidéo Authentique • Visite Réelle",
      video_tour_title: "Visite Guidée & Présentation de l'Institut",
      video_tour_subtitle: "Découvrez notre institut en vidéo réelle : notre cadre chaleureux à Hydra, nos cabines et l'expertise de notre équipe.",
      video_card_title: "Bienvenue chez JOVEN Institut",
      video_card_desc: "Découvrez en vidéo notre institut situé à Hydra : un accueil bienveillant, une hygiène clinique irréprochable et des équipements esthétiques de pointe pour sublimer votre beauté naturelle.",
      btn_book_after_video: "Réserver ma séance sur WhatsApp",
      offers_pill: "Édition Limitée",
        offers_title: "Forfaits & Offres Spéciales",
        offers_subtitle: "Profitez de nos formules signatures combinant soins d'exception et tarifs avantageux.",
        btn_book_offer: "Réserver cette offre sur WhatsApp",
        nav_home: "Accueil",
        nav_services: "Nos Soins",
        nav_about: "À propos",
        nav_gallery: "Galerie",
        nav_reviews: "Avis",
        nav_contact: "Contact",
        btn_book_care: "Réserver un soin",
        hero_badge: "Sanctuaire de Beauté Féminin • Hydra",
        hero_title_html: "Révélez votre<br><span class=\"cursive\">beauté</span> naturelle",
        hero_desc_html: "Soins experts, résultats visibles,<br>dans un cadre élégant et apaisant.",
        hero_whatsapp_btn: "Réserver sur WhatsApp →",
        feat_expertise_title: "Expertise",
        feat_expertise_sub: "+5 ans",
        feat_hygiene_title: "Hygiène",
        feat_hygiene_sub: "irréprochable",
        feat_beauty_title: "Votre beauté,",
        feat_beauty_sub: "notre priorité",
        badge_authentic: "Institut JOVEN • Hydra, Alger",
        btn_video_tour: "Voir la visite vidéo",
        soins_title: "Nos Soins",
        soins_subtitle: "Une gamme complète pour prendre soin de vous",
        cat_all: "Tous les soins",
        cat_visage: "Visage & Hydrafacial",
        cat_pieds: "Pieds & Callus Peeling",
        cat_ongles: "Onglerie & Cils",
        cat_cheveux: "Cheveux & Sothys",
        card_1_title: "Hydrafacial Prestige",
        card_1_desc: "Nettoyage profond en 6 étapes, extraction des impuretés et éclat immédiat.",
        card_2_title: "Manucure & Pédicure BIAB",
        card_2_desc: "Technique russe ultra-précise avec renforcement BIAB tenue 4+ semaines.",
        card_3_title: "Callus Peeling Signature",
        card_3_desc: "Élimination intégrale des callosités pour une douceur absolue de bébé.",
        card_4_title: "Soin Sothys & Head Spa",
        card_4_desc: "Rituel relaxant d'exception, détox cuir chevelu et jeunesse du visage.",
        btn_book_now: "Réserver",
        about_title: "À propos de JOVEN",
        about_desc: "Niché au cœur du prestigieux quartier de Hydra à Alger, l'Institut JOVEN est un havre d'élégance 100% féminin. Avec plus de 5 ans d'expérience passionnée, nous allions protocoles médicaux stricts et cosmétiques de renommée mondiale pour révéler votre éclat naturel en toute intimité.",
        hl_1: "100% Féminin & Intime",
        hl_2: "Sur Rendez-vous Exclusif",
        hl_3: "Protocoles Sothys Paris",
        hl_4: "Hygiène Médicale Certifiée",
        btn_learn_more: "En savoir plus →",
        stat_exp: "Ans<br>d'expérience",
        stat_reviews_count: "262+ avis Google",
        gallery_title: "Galerie & Résultats Réels",
        gallery_subtitle: "Découvrez les résultats authentiques réalisés au sein de notre institut",
        gal_1_title: "Rehaussement de Cils (Lash Lift)",
        gal_1_sub: "Résultat naturel avant/après",
        gal_2_title: "Pédicure Spa Médicale",
        gal_2_sub: "Confort absolu et hygiène clinique",
        gal_3_title: "Protocoles Sothys Paris",
        gal_3_sub: "Produits certifiés d'exception",
        gal_4_title: "Cabine de Soin Privative",
        gal_4_sub: "Espace calme et 100% sécurisé",
        reviews_title: "Nos clientes en parlent",
        reviews_subtitle: "Une confiance partagée, une beauté révélée ♥",
        rev_1_text: "\"Un accueil très chaleureux, une équipe professionnelle et aux petits soins. Le soin Hydrafacial est juste incroyable, ma peau respire enfin ! Je recommande les yeux fermés.\"",
        rev_2_text: "\"Le meilleur institut à Hydra sans hésitation. La propriétaire est d'une douceur et d'une gentillesse rares. Le Callus Peeling a transformé mes pieds en douceur de bébé.\"",
        rev_3_text: "\"Cadre magnifique, propre et calme. L'épilation et la manucure russe sont exécutées à la perfection avec du matériel stérilisé devant vous. Bravo JOVEN !\"",
        rev_verified_client: "Cliente vérifiée Google",
        rev_regular_client: "Cliente régulière • Hydra",
        wa_box_title: "Des centaines de retours chaleureux au quotidien !",
        wa_box_sub: "Envoyez-nous un message sur WhatsApp pour consulter nos disponibilités de la semaine.",
        wa_box_btn: "Écrire sur WhatsApp (0781 08 80 61)",
        contact_title: "Nous trouver & Réserver",
        contact_subtitle: "À votre écoute pour préparer votre moment de bien-être",
        contact_addr_title: "Adresse du salon",
        contact_addr_val: "Chemin de la Madeleine, 27, Hydra, Alger, Algérie",
        contact_view_maps: "Ouvrir sur Google Maps (Plus Code: P2XC+X7) →",
        contact_phone_title: "Téléphone & WhatsApp",
        contact_policy_title: "Politique d'accueil",
        contact_policy_val: "Sur rendez-vous uniquement. Espace 100% féminin dédié à la tranquillité de nos clientes.",
        contact_hours_title: "Horaires d'ouverture",
        day_mon: "Lundi",
        day_tue: "Mardi",
        day_wed: "Mercredi",
        day_thu: "Jeudi",
        day_fri: "Vendredi",
        day_sat: "Samedi",
        day_sun: "Dimanche",
        day_closed: "Fermé (Repos)",
        facade_title: "Chemin de la Madeleine, Hydra",
        facade_sub: "Un quartier résidentiel calme, discret et sécurisé",
        btn_book_appointment: "Prendre un rendez-vous maintenant",
        footer_about: "Institut de beauté et de soins exclusifs pour femmes à Hydra, Alger. Expertise clinique, bien-être absolu et écoute bienveillante.",
        footer_nav: "Navigation",
        footer_services: "Soins Phares",
        footer_contact: "Contact Direct",
        footer_rights: "Tous droits réservés.",
        footer_sub: "Espace 100% féminin sur rendez-vous",
        btn_write_us: "Nous écrire",
        modal_booking_title: "Réserver votre soin",
        modal_booking_sub: "Sélectionnez le soin de votre choix pour finaliser sur WhatsApp en 1 clic.",
        modal_label_name: "Votre Nom & Prénom",
        modal_label_service: "Choix du soin",
        modal_label_date: "Date souhaitée (indicative)",
        modal_btn_confirm: "Confirmer via WhatsApp",
        nav_before_after: "Avant / Après",
        ba_badge: "Résultats Visibles & Authentiques",
        ba_title: "Avant / Après • La Preuve en Image",
        ba_subtitle: "Glissez le curseur interactif pour constater l'efficacité réelle de nos soins sur nos clientes",
        ba_tab_callus: "Callus Peeling",
        ba_tab_cils: "Rehaussement Cils",
        ba_tab_hydra: "Hydrafacial Prestige",
        ba_label_before: "Avant",
        ba_label_after: "Après",
        ba_hint: "Glissez le séparateur pour comparer",
        ba_tarif_label: "Tarif officiel",
        ba_duration_label: "Durée de la séance",
        ba_btn_book_result: "Réserver ce résultat",
        ba_guarantee_text: "100% Réservé aux femmes • Institut privé à Hydra • Sur RDV",
        ba_card_callus_badge: "Pédicure Médicale Russe",
        ba_card_callus_title: "Callus Peeling — Pédicure Profonde",
        ba_card_callus_desc: "Soin signature complet de 2h : bain relaxant bouillonnant, traitement kératolytique sans lames, ponceuse russe de haute précision et bain de paraffine nutritive pour des pieds doux comme ceux d'un nouveau-né dès la 1ère séance.",
        ba_callus_pt1: "100% indolore et sans bistouri (sécurité maximale)",
        ba_callus_pt2: "Élimination des callosités, crevasses et rugosités",
        ba_callus_pt3: "Ponceuse russe & hydratation intense longue durée",
        ba_callus_pt4: "Résultat spectaculaire visible immédiatement",
        ba_card_cils_badge: "Regard & Cils Naturels",
        ba_card_cils_title: "Rehaussement de Cils & Kératine",
        ba_card_cils_desc: "Sublimez la courbure de vos cils naturels sans faux-cils. Vos cils sont recourbés, gainés d'un soin à la kératine et intensifiés en noir pour un regard ouvert et radieux 24h/24.",
        ba_cils_pt1: "Regard agrandi et lumineux sans maquillage",
        ba_cils_pt2: "Tenue exceptionnelle de 6 à 8 semaines",
        ba_cils_pt3: "Soin fortifiant à la kératine pure",
        ba_cils_pt4: "Résiste à l'eau, à la douche et au sport",
        ba_card_hydra_badge: "Soin Visage Médical",
        ba_card_hydra_title: "Hydrafacial Prestige & Extraction",
        ba_card_hydra_desc: "Protocole médico-esthétique en 6 étapes : nettoyage vortex, peeling doux aux acides de fruits, extraction minutieuse des comédons/sébum et infusion d'antioxydants et d'acide hyaluronique pour un teint de verre éclatant.",
        ba_hydra_pt1: "Extraction indolore des points noirs et impuretés",
        ba_hydra_pt2: "Pores immédiatement resserrés et peau lissée",
        ba_hydra_pt3: "Infusion profonde d'acide hyaluronique & vitamines",
        ba_hydra_pt4: "Effet peau neuve éclatante dès la sortie de cabine",

      },

      ar: {
      btn_unmute: "تشغيل الصوت",
      btn_mute: "كتم الصوت",
      hero_stat_sub: "أجواء راقية وخاصة في حيدرة",
      
      reels_badge: "فيديو الصالون الحقيقي • ريلز تعريفي",
      video_tour_title: "جولة حقيقية والتعريف بالصالون والخدمات",
      video_tour_subtitle: "فيديو حصري لصاحبة الصالون تعرّف فيه بالموقع في حيدرة، وأجواء الراحة، وأحدث أجهزة العناية بالبشرة والأقدام.",
      video_card_title: "أهلاً بكِ في معهد جفان (JOVEN Institut)",
      video_card_desc: "شاهدي بالفيديو جولة داخل صالون جفان في حيدرة بالجزائر العاصمة: استقبال راقٍ ومريح، تعقيم ونظافة طبية، وأحدث التقنيات التجميلية لخدمتكِ بكل عناية.",
      btn_book_after_video: "حجز موعدي عبر واتساب",
      offers_pill: "لفترة محدودة",
      offers_title: "باقات وعروض حصرية",
      offers_subtitle: "استمتعي بباقاتنا المتكاملة التي تجمع بين جلسات العناية الفاخرة وأسعار تفضيلية.",
      btn_book_offer: "حجز هذا العرض عبر واتساب",
        nav_home: "الرئيسية",
        nav_services: "علاجاتنا",
        nav_about: "عن المعهد",
        nav_gallery: "المعرض",
        nav_reviews: "آراء الزبائن",
        nav_contact: "التواصل",
        btn_book_care: "حجز موعد",
        hero_badge: "ملاذ الجمال الأنثوي الحصري • حيدرة",
        hero_title_html: "اكتشفي سر<br><span class=\"cursive\">جمالكِ</span> الطبيعي",
        hero_desc_html: "عناية متخصصة، نتائج فورية ملموسة،<br>في أجواء راقية وخصوصية تامة.",
        hero_whatsapp_btn: "احجزي عبر الواتساب ←",
        feat_expertise_title: "خبرة متخصصة",
        feat_expertise_sub: "+5 سنوات",
        feat_hygiene_title: "نظافة وتعقيم",
        feat_hygiene_sub: "بمعايير طبية",
        feat_beauty_title: "جمالكِ وراحتكِ",
        feat_beauty_sub: "أولويتنا الأولى",
        badge_authentic: "معهد جوفن الرسمي • حيدرة، الجزائر",
        btn_video_tour: "مشاهدة جولة الفيديو",
        soins_title: "باقة علاجاتنا وخدماتنا",
        soins_subtitle: "مجموعة متكاملة مصممة خصيصاً للعناية الشاملة بجمالكِ",
        cat_all: "جميع الخدمات",
        cat_visage: "البشرة و الهيدرافيشل",
        cat_pieds: "القدمين والـ Callus",
        cat_ongles: "الأظافر والرموش",
        cat_cheveux: "الشعر وعلاجات سوتيس",
        card_1_title: "هيدرافيشل بريستيج (Hydrafacial)",
        card_1_desc: "تنظيف عميق بـ 6 مراحل متتالية، شفط الرؤوس السوداء ونضارة فورية تدوم.",
        card_2_title: "مانيكير روسي وتدعيم BIAB",
        card_2_desc: "دقة روسية متناهية مع طبقة تقوية بياب لحماية الأظافر لأكثر من 4 أسابيع.",
        card_3_title: "تقشير القدمين الحصري (Callus)",
        card_3_desc: "إزالة كاملة للجلد الميت والتشققات لاستعادة نعومة بشرة الأطفال.",
        card_4_title: "جلسة سوتيس باريس & سبا الشعر",
        card_4_desc: "طقوس استرخاء يابانية فاخرة، ديتوكس فروة الرأس ومكافحة علامات التقدم.",
        btn_book_now: "حجز الجلسة",
        about_title: "عن معهد JOVEN",
        about_desc: "يقع معهد JOVEN في قلب أرقى أحياء العاصمة (حيدرة)، وهو مساحة نسائية مغلقة 100% تجمع بين الراحة والهدوء. بخبرة تفوق 5 سنوات من الشغف والاحتراف، نعتمد أدق البروتوكولات السريرية ومنتجات سوتيس الباريسية العالمية لمنحكِ النتائج التي تحلمين بها في سرية وراحة تامة.",
        hl_1: "نسائي 100% وبخصوصية تامة",
        hl_2: "الحجز المسبق إجباري (Sur RDV)",
        hl_3: "مستحضرات Sothys Paris الأصلية",
        hl_4: "تعقيم طبي صارم لكل زبونة",
        btn_learn_more: "تعرفي علينا أكثر ←",
        stat_exp: "سنوات<br>من الخبرة",
        stat_reviews_count: "+262 تقييماً معتمداً",
        gallery_title: "معرض الصور والنتائج الحقيقية",
        gallery_subtitle: "شاهدي صوراً وفيديوهات حقيقية من داخل معهدنا بحيدرة",
        gal_1_title: "رفع وتغذية الرموش الطبيعية (Lash Lift)",
        gal_1_sub: "نتائج حقيقية قبل وبعد الجلسة",
        gal_2_title: "جناح البديكير الطبي الفاخر",
        gal_2_sub: "أقصى درجات الراحة والتعقيم",
        gal_3_title: "بروتوكولات ماركة Sothys Paris",
        gal_3_sub: "مستحضرات طبية أصلية مضمونة",
        gal_4_title: "غرف العلاج الفردية الخاصة",
        gal_4_sub: "هدوء وسكينة واستقلالية تامة",
        reviews_title: "ماذا تقول زبوناتنا عنا؟",
        reviews_subtitle: "ثقة متبادلة، وجمال حقيقي يتحدث عن نفسه ♥",
        rev_1_text: "\"استقبال في غاية الدفء والترحاب، وفريق عمل يتميز بالاحترافية العالية. جلسة الهيدرافيشل كانت مذهلة بحق، شعرت أن بشرتي تتنفس أخيراً من جديد! أنصح به وعيني مغمضة.\"",
        rev_2_text: "\"أفضل معهد تجميل في حيدرة بلا أدنى تردد. صاحبة الصالون تتسم بلطف وهدوء نادرين. جلسة تقشير القدمين (Callus Peeling) حولت قدمي إلى نعومة بشرة الأطفال.\"",
        rev_3_text: "\"المكان نظيف، هادئ ومريح جداً للأعصاب. تقنية المانيكير الروسي رائعة ويتم تعقيم كل الأدوات أمام عينيك قبل البدء. برافو جوفن!\"",
        rev_verified_client: "زبونة موثقة عبر Google Maps",
        rev_regular_client: "زبونة دائمة • حيدرة",
        wa_box_title: "مئات الرسائل وكلمات الشكر اليومية من عميلاتنا!",
        wa_box_sub: "تفضلي بمراسلتنا على الواتساب للاطلاع على المواعيد المتاحة لهذا الأسبوع.",
        wa_box_btn: "تحدثي معنا عبر الواتساب (0781 08 80 61)",
        contact_title: "موقعنا وطريقة الحجز",
        contact_subtitle: "يسعدنا دائماً استقبال استفساراتكِ ومساعدتكِ في اختيار جلستكِ",
        contact_addr_title: "عنوان المعهد بالتفصيل",
        contact_addr_val: "طريق لا مادلين (Chemin de la Madeleine)، 27، حيدرة، الجزائر العاصمة",
        contact_view_maps: "فتح الموقع على Google Maps (Plus Code: P2XC+X7) ←",
        contact_phone_title: "الهاتف والواتساب المباشر",
        contact_policy_title: "شروط الدخول والاستقبال",
        contact_policy_val: "الحجز مسبقاً إجباري. المعهد مخصص للسيدات بنسبة 100% حرصاً على راحتكن وخصوصيتكن التامة.",
        contact_hours_title: "أوقات العمل الرسمية",
        day_mon: "الإثنين",
        day_tue: "الثلاثاء",
        day_wed: "الأربعاء",
        day_thu: "الخميس",
        day_fri: "الجمعة",
        day_sat: "السبت",
        day_sun: "الأحد",
        day_closed: "مغلق (عطلة أسبوعية)",
        facade_title: "شارع لا مادلين، حيدرة",
        facade_sub: "حي سكني هادئ، راقٍ وآمن مع سهولة ركن السيارات",
        btn_book_appointment: "تأكيد حجز موعدكِ الآن",
        footer_about: "معهد متخصص في العناية الطبية والتجميلية الحصرية للسيدات في حيدرة، الجزائر العاصمة. خبرة، نظافة وخصوصية لا تضاهى.",
        footer_nav: "روابط سريعة",
        footer_services: "أشهر الخدمات",
        footer_contact: "تواصل مباشر",
        footer_rights: "جميع الحقوق محفوظة لمعهد JOVEN.",
        footer_sub: "معهد نسائي 100% • الحجز مسبقاً",
        btn_write_us: "راسلنا واتساب",
        modal_booking_title: "تأكيد حجز جلستكِ",
        modal_booking_sub: "اختاري الخدمة المناسبة وسيتم نقلكِ مباشرة للواتساب لتثبيت التوقيت.",
        modal_label_name: "الاسم واللقب",
        modal_label_service: "الخدمة المطلوبة",
        modal_label_date: "التاريخ المقترح (اختياري)",
        modal_btn_confirm: "إرسال الحجز عبر الواتساب",
        nav_before_after: "قبل وبعد",
        ba_badge: "نتائج حقيقية ملموسة من أول جلسة",
        ba_title: "قبل وبعد • الدليل بالصورة الحقيقية",
        ba_subtitle: "اسحبي المؤشر التفاعلي لمشاهدة الفرق المذهل والنتائج الحقيقية لزبوناتنا في الصالون",
        ba_tab_callus: "تقشير القدمين (Callus)",
        ba_tab_cils: "رفع الرموش (Lash Lift)",
        ba_tab_hydra: "هيدرافيشل بريستيج",
        ba_label_before: "قبل",
        ba_label_after: "بعد",
        ba_hint: "اسحبي الفاصل يميناً ويساراً للمقارنة",
        ba_tarif_label: "السعر الرسمي المعتمد",
        ba_duration_label: "مدة الجلسة الكاملة",
        ba_btn_book_result: "حجز هذه النتيجة المؤكدة",
        ba_guarantee_text: "100% نسائي بالكامل • معهد خاص بحيدرة • الحجز مسبقاً",
        ba_card_callus_badge: "بديكير طبي روسي فاخر",
        ba_card_callus_title: "تقشير القدمين الحصري • Callus Peeling",
        ba_card_callus_desc: "جلسة توقيعية كاملة لمدة ساعتين (2h) تشمل: حمام فقاعات استرخائي، تركيبة تقشير كيراتينية بدون شفرات، صقل مجهري بجهاز البوديكير الروسي وترطيب مكثف بالبرافين لاستعادة نعومة أقدام الأطفال من أول جلسة.",
        ba_callus_pt1: "بدون ألم وبدون شفرات حادة (أمان طبي 100%)",
        ba_callus_pt2: "تخلص نهائي من التشققات والجلد الخشن المتراكم",
        ba_callus_pt3: "صقل روسي متقن وترطيب علاجي عميق يدوم طويلاً",
        ba_callus_pt4: "نتيجة فورية ملموسة ومبهرة من أول زيارة",
        ba_card_cils_badge: "جمال وسحر العيون",
        ba_card_cils_title: "رفع وتغذية الرموش بالكيراتين (Lash Lift)",
        ba_card_cils_desc: "إبراز طول وكثافة رموشكِ الطبيعية دون الحاجة لرموش اصطناعية أو ماسكارا. رفع وتقويس جذاب مع صبغ أسود مكثف وحمام كيراتين معالج لعيون ساحرة ومفتوحة طوال اليوم.",
        ba_cils_pt1: "عيون واسعة وجذابة بدون الحاجة لماسكارا يومية",
        ba_cils_pt2: "ثبات طويل الأمد يدوم من 6 إلى 8 أسابيع",
        ba_cils_pt3: "تغذية علاجية مكثفة بألياف الكيراتين النقي",
        ba_cils_pt4: "مقاوم للماء والاستحمام ولا يضر الرموش الطبيعية",
        ba_card_hydra_badge: "علاج طبي متقدم للبشرة",
        ba_card_hydra_title: "جلسة الهيدرافيشل بريستيج وتنقية المسام",
        ba_card_hydra_desc: "بروتوكول تجميلي طبيعي متكامل في 6 مراحل: تقشير بالدوامة المائية، تنظيف لطيف بأحماض الفواكه، شفط عميق للرؤوس السوداء والبيضاء والدهون، وحقن سيرومات حمض الهيالورونيك ومضادات الأكسدة لنضارة زجاجية فورية.",
        ba_hydra_pt1: "شفط عميق وغير مؤلم للرؤوس السوداء والدهون المتراكمة",
        ba_hydra_pt2: "تضييق فوري للمسام وتنعيم متكامل لملمس البشرة",
        ba_hydra_pt3: "تغذية عميقة بمضادات الأكسدة وحمض الهيالورونيك",
        ba_hydra_pt4: "نضارة وإشراقة زجاجية فورية تلاحظينها عند الخروج",

      },

      en: {
      btn_unmute: "Unmute Audio",
      btn_mute: "Mute Audio",
      hero_stat_sub: "Luxury private haven in Hydra",
      
      reels_badge: "Authentic Video • Real Tour",
      video_tour_title: "Guided Tour & Salon Presentation",
      video_tour_subtitle: "Experience our institute in real video: our serene sanctuary in Hydra, our modern treatment suites and expert care.",
      video_card_title: "Welcome to JOVEN Institut",
      video_card_desc: "Watch the video walkthrough of our private sanctuary in Hydra, Algiers: clinical hygiene, soothing atmosphere, and cutting-edge aesthetic care.",
      btn_book_after_video: "Book my session on WhatsApp",
      offers_pill: "Limited Edition",
      offers_title: "Special Packages & Offers",
      offers_subtitle: "Experience our signature packages combining expert treatments with preferential rates.",
      btn_book_offer: "Book this offer on WhatsApp",
        nav_home: "Home",
        nav_services: "Our Care",
        nav_about: "About Us",
        nav_gallery: "Gallery",
        nav_reviews: "Reviews",
        nav_contact: "Contact",
        btn_book_care: "Book Treatment",
        hero_badge: "Exclusive Women Beauty Sanctuary • Hydra",
        hero_title_html: "Reveal your<br><span class=\"cursive\">natural</span> beauty",
        hero_desc_html: "Expert care, visible results,<br>in an elegant and soothing sanctuary.",
        hero_whatsapp_btn: "Book on WhatsApp →",
        feat_expertise_title: "Expertise",
        feat_expertise_sub: "+5 years",
        feat_hygiene_title: "Hygiene",
        feat_hygiene_sub: "flawless",
        feat_beauty_title: "Your beauty,",
        feat_beauty_sub: "our priority",
        badge_authentic: "Official JOVEN Sanctuary • Hydra, Algiers",
        btn_video_tour: "Watch Video Tour",
        soins_title: "Our Treatments",
        soins_subtitle: "A comprehensive range designed to elevate your natural glow",
        cat_all: "All Treatments",
        cat_visage: "Facial & Hydrafacial",
        cat_pieds: "Feet & Callus Peeling",
        cat_ongles: "Nails & Lashes",
        cat_cheveux: "Hair & Sothys",
        card_1_title: "Hydrafacial Prestige",
        card_1_desc: "6-step deep pore cleansing, gentle extraction and instant glass-skin radiance.",
        card_2_title: "Russian Manicure & BIAB",
        card_2_desc: "Ultra-precise cuticle care with durable BIAB overlay lasting 4+ weeks.",
        card_3_title: "Signature Callus Peeling",
        card_3_desc: "Complete removal of rough skin and cracks for silky baby-soft feet.",
        card_4_title: "Sothys Paris & Head Spa",
        card_4_desc: "Luxurious Japanese Head Spa ritual, scalp detox and anti-aging face care.",
        btn_book_now: "Book Now",
        about_title: "About JOVEN",
        about_desc: "Located in the prestigious neighborhood of Hydra, Algiers, JOVEN Institute is a 100% female sanctuary. Backed by 5+ years of dedicated expertise, we unite strict clinical hygiene with world-renowned Sothys Paris skincare to reveal your radiant beauty in absolute privacy.",
        hl_1: "100% Female & Private",
        hl_2: "By Appointment Only",
        hl_3: "Authentic Sothys Paris",
        hl_4: "Certified Clinical Hygiene",
        btn_learn_more: "Learn More →",
        stat_exp: "Years of<br>Experience",
        stat_reviews_count: "262+ Google Reviews",
        gallery_title: "Gallery & Real Results",
        gallery_subtitle: "Explore authentic photos and video reels from our sanctuary in Hydra",
        gal_1_title: "Natural Lash Lift & Tint",
        gal_1_sub: "Authentic before and after results",
        gal_2_title: "Medical Spa Pedicure Suite",
        gal_2_sub: "Absolute comfort and sterile clinical care",
        gal_3_title: "Sothys Paris Skincare Protocols",
        gal_3_sub: "Certified luxury French formulas",
        gal_4_title: "Private Treatment Cabin",
        gal_4_sub: "Quiet, peaceful and fully discreet",
        reviews_title: "What Our Clients Say",
        reviews_subtitle: "Shared trust, revealed beauty ♥",
        rev_1_text: "\"A warm welcome and an exceptionally caring team. The Hydrafacial treatment was breathtaking, my skin is finally breathing! Highly recommended.\"",
        rev_2_text: "\"Hands down the best institute in Hydra. The founder is remarkably gentle. The Callus Peeling turned my feet into pure baby-soft smoothness.\"",
        rev_3_text: "\"Stunning, spotless and peaceful atmosphere. Russian manicure executed with clinical sterilization. Bravo JOVEN!\"",
        rev_verified_client: "Verified Google Maps Reviewer",
        rev_regular_client: "Regular Client • Hydra",
        wa_box_title: "Hundreds of heartfelt messages received every week!",
        wa_box_sub: "Feel free to message us on WhatsApp to check this week's open appointment slots.",
        wa_box_btn: "Message on WhatsApp (0781 08 80 61)",
        contact_title: "Find Us & Book",
        contact_subtitle: "We are delighted to assist you in selecting your ideal self-care session",
        contact_addr_title: "Institute Address",
        contact_addr_val: "Chemin de la Madeleine, 27, Hydra, Algiers, Algeria",
        contact_view_maps: "Open in Google Maps (Plus Code: P2XC+X7) →",
        contact_phone_title: "Phone & WhatsApp",
        contact_policy_title: "Admission Policy",
        contact_policy_val: "By appointment only. 100% women-only private sanctuary.",
        contact_hours_title: "Opening Hours",
        day_mon: "Monday",
        day_tue: "Tuesday",
        day_wed: "Wednesday",
        day_thu: "Thursday",
        day_fri: "Friday",
        day_sat: "Saturday",
        day_sun: "Sunday",
        day_closed: "Closed (Rest Day)",
        facade_title: "Chemin de la Madeleine, Hydra",
        facade_sub: "A calm, elegant and discreet residential neighborhood",
        btn_book_appointment: "Book Your Appointment Now",
        footer_about: "Exclusive women-only beauty & skincare sanctuary in Hydra, Algiers. Clinical expertise, genuine warmth and utmost privacy.",
        footer_nav: "Navigation",
        footer_services: "Signature Care",
        footer_contact: "Direct Contact",
        footer_rights: "All rights reserved.",
        footer_sub: "100% women-only • By appointment",
        btn_write_us: "Message Us",
        modal_booking_title: "Book Your Treatment",
        modal_booking_sub: "Choose your desired service to finalize on WhatsApp in one click.",
        modal_label_name: "Full Name",
        modal_label_service: "Desired Care",
        modal_label_date: "Preferred Date (optional)",
        modal_btn_confirm: "Confirm via WhatsApp",
        nav_before_after: "Before / After",
        ba_badge: "Visible & Authentic Results",
        ba_title: "Before & After • Real Proof in Photos",
        ba_subtitle: "Drag the interactive slider to experience the authentic transformation of our salon clients",
        ba_tab_callus: "Callus Peeling",
        ba_tab_cils: "Lash Lift",
        ba_tab_hydra: "Hydrafacial Prestige",
        ba_label_before: "Before",
        ba_label_after: "After",
        ba_hint: "Drag the divider to compare",
        ba_tarif_label: "Official Rate",
        ba_duration_label: "Session Duration",
        ba_btn_book_result: "Book This Result",
        ba_guarantee_text: "100% Women-Only • Private Institute in Hydra • By Appointment",
        ba_card_callus_badge: "Medical Russian Pedicure",
        ba_card_callus_title: "Signature Callus Peeling — Deep Pedicure",
        ba_card_callus_desc: "Comprehensive 2-hour signature ritual: relaxing bubble bath, blade-free keratolytic peeling, high-precision Russian sanding and deep paraffin hydration for pure baby-soft feet from the very first session.",
        ba_callus_pt1: "100% painless and blade-free (maximum clinical safety)",
        ba_callus_pt2: "Complete eradication of rough calluses, cracks and dry skin",
        ba_callus_pt3: "Russian precision milling & long-lasting deep hydration",
        ba_callus_pt4: "Immediate, visible and breathtaking transformation",
        ba_card_cils_badge: "Natural Eye Radiance",
        ba_card_cils_title: "Keratin Lash Lift & Tint",
        ba_card_cils_desc: "Elevate your natural lashes without extensions. Curled from the root, nourished with pure keratin and tinted in deep rich black for an effortlessly awake and stunning gaze 24/7.",
        ba_cils_pt1: "Bright, wide-awake gaze with zero daily mascara",
        ba_cils_pt2: "Long-lasting results holding 6 to 8 weeks",
        ba_cils_pt3: "Deeply fortifying pure keratin infusion",
        ba_cils_pt4: "Waterproof, gym-proof and completely gentle on lashes",
        ba_card_hydra_badge: "Advanced Medical Facial",
        ba_card_hydra_title: "Hydrafacial Prestige & Deep Extraction",
        ba_card_hydra_desc: "6-step medical aesthetic protocol: vortex cleansing, gentle fruit acid peeling, painless blackhead and sebum extraction, and deep infusion of hyaluronic acid and antioxidants for an undeniable glass-skin glow.",
        ba_hydra_pt1: "Painless vacuum extraction of blackheads & impurities",
        ba_hydra_pt2: "Instantly refined pores and smoothed skin texture",
        ba_hydra_pt3: "Deep infusion of hyaluronic acid & vital antioxidants",
        ba_hydra_pt4: "Instant radiant glass skin straight out of the cabin",

      }
    };

    let currentLang = localStorage.getItem('joven_lang') || 'fr';

    
    /* ==========================================================
       SUPABASE REAL-TIME INTEGRATION
    ========================================================== */
    const SUPABASE_CONFIG = {
      url: 'https://mtuhuzmyhbemdfsbyhpf.supabase.co',
      anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10dWh1em15aGJlbWRmc2J5aHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MjIxNDAsImV4cCI6MjA5MjQ5ODE0MH0.Pip_Y_FfjJvnOHxnAMNUlHMBLkGefVxH2dVMsXaIQ08'
    };

    let supabaseApp = null;
    window.DYNAMIC_SERVICES = [];
    window.DYNAMIC_OFFERS = [];
    window.DYNAMIC_GALLERY = [];

    try {
      if (window.supabase) {
        supabaseApp = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      }
    } catch (e) {
      console.warn('Supabase initialization failed, running with static fallback:', e);
    }

    // Fetch and sync services, offers & gallery from Supabase
    async function syncDataFromSupabase() {
      if (!supabaseApp) return;

      try {
        const [servicesRes, offersRes, galleryRes] = await Promise.all([
          supabaseApp.from('services').select('*').eq('is_active', true).order('display_order', { ascending: true }),
          supabaseApp.from('offers').select('*').eq('is_active', true).order('created_at', { ascending: false }),
          supabaseApp.from('gallery_images').select('*').order('created_at', { ascending: false })
        ]);

        if (!servicesRes.error && Array.isArray(servicesRes.data)) {
          window.DYNAMIC_SERVICES = servicesRes.data;
          renderSupabaseServices();
          updateServiceDropdown();
        }

        if (!offersRes.error && Array.isArray(offersRes.data)) {
          window.DYNAMIC_OFFERS = offersRes.data;
          renderSupabaseOffers();
        }

        if (!galleryRes.error && Array.isArray(galleryRes.data) && galleryRes.data.length > 0) {
          window.DYNAMIC_GALLERY = galleryRes.data;
          renderSupabaseGallery();
        }
      } catch (err) {
        console.warn('Could not sync with Supabase (using static fallback):', err);
      }
    }

    function renderSupabaseServices(categoryFilter = 'all') {
      const carousel = document.getElementById('soinsCarousel');
      if (!carousel) return;

      if (!window.DYNAMIC_SERVICES || window.DYNAMIC_SERVICES.length === 0) {
        // Retain static catalog if Supabase returned 0 items
        return;
      }

      const isAr = (currentLang === 'ar');
      const isEn = (currentLang === 'en');

      const filtered = (categoryFilter === 'all')
        ? window.DYNAMIC_SERVICES
        : window.DYNAMIC_SERVICES.filter(s => {
            const cat = (s.category || '').toLowerCase();
            if (categoryFilter === 'visage') return cat.includes('visage');
            if (categoryFilter === 'pieds') return cat.includes('pied') || cat.includes('callus');
            if (categoryFilter === 'ongles') return cat.includes('ongle') || cat.includes('main') || cat.includes('cils') || cat.includes('regard');
            if (categoryFilter === 'cheveux') return cat.includes('cheveu') || cat.includes('capill') || cat.includes('spa');
            return true;
          });

      if (filtered.length === 0) {
        carousel.innerHTML = '<p style="padding: 20px; color: var(--text-muted);">' + (isAr ? 'لا توجد خدمات في هذا القسم حالياً.' : 'Aucun soin disponible dans cette catégorie pour le moment.') + '</p>';
        return;
      }

      carousel.innerHTML = filtered.map(s => {
        const title = isAr && s.title_ar ? s.title_ar : s.title;
        const desc = isAr && s.description_ar ? s.description_ar : (s.description || '');
        const price = s.price || '';
        const duration = s.duration || '';
        const img = s.image_url || 'media/hydra_after.jpg';
        const bookText = isAr ? 'حجز الآن' : (isEn ? 'Book Now' : 'Réserver');

        return `
          <article class="soin-card" data-category="${s.category || 'all'}" onclick="bookSpecificService('${title.replace(/'/g, "\\'")}')">
            <div class="soin-media">
              <img src="${img}" alt="${title}" onerror="this.src='media/hydra_after.jpg'">
              <div class="soin-floating-icon" title="${title}">
                <svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              </div>
            </div>
            <div class="soin-info">
              <div>
                <h3 class="soin-name">${title}</h3>
                <p class="soin-desc">${desc}</p>
              </div>
              <div class="soin-meta">
                <span class="soin-price">${price}</span>
                <span class="soin-duration">⏱ ${duration}</span>
              </div>
              <div class="soin-book-btn">
                <span>💬</span> <span>${bookText}</span>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }

    function renderSupabaseOffers() {
      const container = document.getElementById('offersGridContainer');
      const wrap = document.getElementById('offresSpecialesWrap');
      if (!container) return;

      if (!window.DYNAMIC_OFFERS || window.DYNAMIC_OFFERS.length === 0) {
        if (wrap) wrap.style.display = 'none';
        container.innerHTML = '';
        return;
      }

      if (wrap) wrap.style.display = 'block';

      const isAr = (currentLang === 'ar');
      const isEn = (currentLang === 'en');
      const btnText = isAr ? 'حجز هذا العرض عبر واتساب' : (isEn ? 'Book this offer on WhatsApp' : 'Réserver cette offre sur WhatsApp');

      container.innerHTML = window.DYNAMIC_OFFERS.map(o => {
        const title = isAr && o.title_ar ? o.title_ar : o.title;
        const badge = isAr && o.badge_ar ? o.badge_ar : o.badge;
        const desc = isAr && o.description_ar ? o.description_ar : (o.description || '');
        const img = o.image_url || 'media/hydra_after.jpg';
        const waMsg = encodeURIComponent(
          isAr 
            ? `مرحباً صالون جفان (JOVEN)، أود الاستفادة من هذا العرض الخاص: ${title} (${o.new_price})`
            : `Bonjour JOVEN Institut, je souhaite profiter de votre offre spéciale : ${title} (${o.new_price})`
        );
        const waLink = `https://wa.me/213781088061?text=${waMsg}`;

        return `
          <div class="offer-card">
            <div class="offer-thumb">
              <img src="${img}" alt="${title}" onerror="this.src='media/hydra_after.jpg'">
              ${badge ? `<span class="offer-badge">${badge}</span>` : ''}
            </div>
            <div class="offer-content">
              <h4 class="offer-card-title">${title}</h4>
              <p class="offer-card-desc">${desc}</p>
              <div class="offer-price-row">
                ${o.old_price ? `<span class="offer-old-price">${o.old_price}</span>` : ''}
                <span class="offer-new-price">${o.new_price}</span>
              </div>
              <a href="${waLink}" target="_blank" rel="noopener" class="offer-btn">
                <span>💬</span> ${btnText}
              </a>
            </div>
          </div>
        `;
      }).join('');
    }

    function renderSupabaseGallery() {
      if (!window.DYNAMIC_GALLERY || window.DYNAMIC_GALLERY.length === 0) return;
      const grid = document.querySelector('.galerie-grid');
      if (!grid) return;

      const isAr = (currentLang === 'ar');
      grid.innerHTML = window.DYNAMIC_GALLERY.map(g => `
        <div class="galerie-item" onclick="openImageModal('${g.image_url}', '${(g.title || 'Photo JOVEN').replace(/'/g, "\\'")}')">
          <img src="${g.image_url}" alt="${g.title || 'Photo JOVEN Institut'}" onerror="this.src='media/salon_real_reception.jpg'">
          <div class="galerie-overlay">
            <strong>${g.title || 'JOVEN Institut'}</strong>
            <span>${g.category === 'salon' ? (isAr ? 'أجواء ومرافق الصالون' : 'Espace Institut') : (isAr ? 'نتائج حقيقية' : 'Résultat Soin')}</span>
          </div>
        </div>
      `).join('');
    }

    function updateServiceDropdown() {
      const select = document.getElementById('serviceSelect');
      if (!select || !window.DYNAMIC_SERVICES || window.DYNAMIC_SERVICES.length === 0) return;

      const isAr = (currentLang === 'ar');
      select.innerHTML = window.DYNAMIC_SERVICES.map(s => {
        const title = isAr && s.title_ar ? s.title_ar : s.title;
        return `<option value="${title}">${title} (${s.price || ''})</option>`;
      }).join('') + '<option value="Consultation sur place">Consultation sur place</option>';
    }

    // Setup Realtime Sync Listener
    function setupRealtimeListener() {
      if (!supabaseApp) return;
      try {
        supabaseApp.channel('public:db_changes')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => syncDataFromSupabase())
          .on('postgres_changes', { event: '*', schema: 'public', table: 'offers' }, () => syncDataFromSupabase())
          .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery_images' }, () => syncDataFromSupabase())
          .subscribe();
      } catch (e) {
        console.warn('Realtime listener failed:', e);
      }
    }

    // Call sync on page load
    window.addEventListener('DOMContentLoaded', () => {
      syncDataFromSupabase();
      setupRealtimeListener();
    });


    function switchLanguage(lang) {
      if (!I18N[lang]) return;
      currentLang = lang;
      localStorage.setItem('joven_lang', lang);

      // Update HTML attributes
      document.documentElement.lang = lang;
      document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

      // Update buttons active state
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(lang) || (lang === 'ar' && btn.textContent.includes('عربي')));
      });

      // Update comparison card
      if (typeof updateComparisonCardTexts === "function") updateComparisonCardTexts();
      // Re-render Supabase items in new language
      if (typeof renderSupabaseServices === 'function') renderSupabaseServices();
      if (typeof renderSupabaseOffers === 'function') renderSupabaseOffers();
      if (typeof updateServiceDropdown === 'function') updateServiceDropdown();


      // Update text nodes
      const dict = I18N[lang];
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          if (key.includes('_html')) {
            el.innerHTML = dict[key];
          } else {
            el.textContent = dict[key];
          }
        }
      });
    }

    /* ==========================================================
       BEFORE / AFTER COMPARISON SLIDER LOGIC
    ========================================================== */
    const TREATMENTS_DATA = {
      callus: {
        beforeImg: '/media/comparison/callus_before.jpg',
        afterImg: '/media/comparison/callus_after.jpg',
        prices: { fr: '6 000 DA', ar: '6000 دج', en: '6,000 DA' },
        duration: { fr: '⏱ 2 heures (120 min)', ar: '⏱ ساعتان (120 دقيقة)', en: '⏱ 2 hours (120 min)' },
        badgeKey: 'ba_card_callus_badge',
        titleKey: 'ba_card_callus_title',
        descKey: 'ba_card_callus_desc',
        points: ['ba_callus_pt1', 'ba_callus_pt2', 'ba_callus_pt3', 'ba_callus_pt4'],
        waMsg: {
          fr: 'Bonjour JOVEN, je souhaite réserver le soin Callus Peeling (6 000 DA) pour retrouver des pieds tout doux.',
          ar: 'مرحبا معهد JOVEN، أود حجز جلسة تقشير القدمين Callus Peeling (6000 دج) لتنعيم القدمين والتخلص من التشققات.',
          en: 'Hello JOVEN, I would like to book the Callus Peeling treatment (6,000 DA).'
        }
      },
      cils: {
        beforeImg: '/media/comparison/cils_before.jpg',
        afterImg: '/media/comparison/cils_after.jpg',
        prices: { fr: '6 000 DA', ar: '6000 دج', en: '6,000 DA' },
        duration: { fr: '⏱ 60 min', ar: '⏱ 60 دقيقة (ساعة)', en: '⏱ 60 min' },
        badgeKey: 'ba_card_cils_badge',
        titleKey: 'ba_card_cils_title',
        descKey: 'ba_card_cils_desc',
        points: ['ba_cils_pt1', 'ba_cils_pt2', 'ba_cils_pt3', 'ba_cils_pt4'],
        waMsg: {
          fr: 'Bonjour JOVEN, je souhaite réserver le Rehaussement de Cils & Kératine (6 000 DA).',
          ar: 'مرحبا معهد JOVEN، أود حجز جلسة رفع الرموش بالكيراتين Lash Lift (6000 دج).',
          en: 'Hello JOVEN, I would like to book the Keratin Lash Lift treatment (6,000 DA).'
        }
      },
      hydra: {
        beforeImg: '/media/comparison/hydra_before.jpg',
        afterImg: '/media/comparison/hydra_after.jpg',
        prices: { fr: '8 500 DA', ar: '8500 دج', en: '8,500 DA' },
        duration: { fr: '⏱ 90 min (1h30)', ar: '⏱ 90 دقيقة (ساعة ونصف)', en: '⏱ 90 min (1h30)' },
        badgeKey: 'ba_card_hydra_badge',
        titleKey: 'ba_card_hydra_title',
        descKey: 'ba_card_hydra_desc',
        points: ['ba_hydra_pt1', 'ba_hydra_pt2', 'ba_hydra_pt3', 'ba_hydra_pt4'],
        waMsg: {
          fr: 'Bonjour JOVEN, je souhaite réserver le soin Hydrafacial Prestige (8 500 DA) pour nettoyer et illuminer ma peau.',
          ar: 'مرحبا معهد JOVEN، أود حجز جلسة الهيدرافيشل بريستيج (8 500 دج) لتنقية البشرة وإزالة الرؤوس السوداء.',
          en: 'Hello JOVEN, I would like to book the Hydrafacial Prestige treatment (8,500 DA).'
        }
      }
    };

    let activeTreatment = 'callus';

    function setComparisonTreatment(key) {
      if (!TREATMENTS_DATA[key]) return;
      activeTreatment = key;

      // Update tabs UI
      document.querySelectorAll('.ba-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-treatment') === key);
      });

      const data = TREATMENTS_DATA[key];
      const stage = document.getElementById('baStage');
      const imgBefore = document.getElementById('baImgBefore');
      const imgAfter = document.getElementById('baImgAfter');

      // Update images
      imgBefore.src = data.beforeImg;
      imgAfter.src = data.afterImg;

      // Reset split to 50%
      updateSliderPosition(50);
      const range = document.getElementById('baRangeInput');
      if (range) range.value = 50;

      // Update Card details
      updateComparisonCardTexts();
    }

    function updateComparisonCardTexts() {
      if (typeof TREATMENTS_DATA === 'undefined') return;
      const data = TREATMENTS_DATA[activeTreatment];
      if (!data) return;
      const dict = I18N[currentLang] || I18N.fr;

      // Update tab prices
      const tabCallusPrice = document.getElementById('baTabCallusPrice');
      const tabCilsPrice = document.getElementById('baTabCilsPrice');
      const tabHydraPrice = document.getElementById('baTabHydraPrice');
      if (tabCallusPrice) tabCallusPrice.textContent = TREATMENTS_DATA.callus.prices[currentLang] || TREATMENTS_DATA.callus.prices.fr;
      if (tabCilsPrice) tabCilsPrice.textContent = TREATMENTS_DATA.cils.prices[currentLang] || TREATMENTS_DATA.cils.prices.fr;
      if (tabHydraPrice) tabHydraPrice.textContent = TREATMENTS_DATA.hydra.prices[currentLang] || TREATMENTS_DATA.hydra.prices.fr;

      const currentPrice = data.prices[currentLang] || data.prices.fr;
      const badge = document.getElementById('baCardBadge');
      const title = document.getElementById('baCardTitle');
      const desc = document.getElementById('baCardDesc');
      const price = document.getElementById('baCardPrice');
      const duration = document.getElementById('baCardDuration');
      const cta = document.getElementById('baCtaBtnText');
      const btn = document.getElementById('baWhatsAppBtn');

      if (badge && dict[data.badgeKey]) badge.textContent = dict[data.badgeKey];
      if (title && dict[data.titleKey]) title.textContent = dict[data.titleKey];
      if (desc && dict[data.descKey]) desc.textContent = dict[data.descKey];
      if (price) price.textContent = currentPrice;
      if (duration && data.duration[currentLang]) duration.textContent = data.duration[currentLang];
      if (cta) cta.textContent = (dict.ba_btn_book_result || 'Réserver ce résultat') + ' (' + currentPrice + ')';

      const pointsContainer = document.getElementById('baCardPoints');
      if (pointsContainer && data.points) {
        pointsContainer.innerHTML = data.points.map(ptKey => `
          <li><span class="check-icon">✓</span> <span>${dict[ptKey] || ''}</span></li>
        `).join('');
      }

      if (btn) {
        const msg = data.waMsg[currentLang] || data.waMsg.fr;
        btn.href = 'https://wa.me/213781088061?text=' + encodeURIComponent(msg);
      }
    }

    // Initialize Language
    switchLanguage(currentLang);

    // Interactive Drag / Touch Slider Handler
    function updateSliderPosition(percent) {
      const stage = document.getElementById('baStage');
      if (!stage) return;
      const clamped = Math.max(0, Math.min(100, percent));
      stage.style.setProperty('--split', clamped + '%');
    }

    function initComparisonSlider() {
      const stage = document.getElementById('baStage');
      const range = document.getElementById('baRangeInput');
      if (!stage) return;

      let isDragging = false;

      function getPercentageFromEvent(e) {
        const rect = stage.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const isRtl = document.documentElement.dir === 'rtl';

        let p;
        if (isRtl) {
          p = ((rect.right - clientX) / rect.width) * 100;
        } else {
          p = ((clientX - rect.left) / rect.width) * 100;
        }
        return Math.max(0, Math.min(100, p));
      }

      function onMove(e) {
        if (!isDragging) return;
        const p = getPercentageFromEvent(e);
        updateSliderPosition(p);
        if (range) range.value = p;
      }

      function onEnd() {
        isDragging = false;
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onEnd);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onEnd);
      }

      stage.addEventListener('mousedown', (e) => {
        isDragging = true;
        const p = getPercentageFromEvent(e);
        updateSliderPosition(p);
        if (range) range.value = p;
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);
      });

      stage.addEventListener('touchstart', (e) => {
        isDragging = true;
        const p = getPercentageFromEvent(e);
        updateSliderPosition(p);
        if (range) range.value = p;
        window.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('touchend', onEnd);
      }, { passive: true });

      if (range) {
        range.addEventListener('input', (e) => {
          updateSliderPosition(parseFloat(e.target.value));
        });
      }
    }

    // Call init on DOM load
    document.addEventListener('DOMContentLoaded', () => {
      initComparisonSlider();
      updateComparisonCardTexts();
    });


    /* ==========================================================
       2. ROMANTIC FEMININE PETALS ANIMATION
    ========================================================== */
    const canvas = document.getElementById('petalCanvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petalCount = 22; // subtle, ultra-delicate
    const petals = [];

    class Petal {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -20;
        this.size = Math.random() * 8 + 6;
        this.speedY = Math.random() * 0.7 + 0.4;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.45 + 0.25;
        this.color = Math.random() > 0.4 ? 'rgba(231, 165, 185, ' : 'rgba(247, 214, 229, ';
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.3;
        this.rotation += this.rotSpeed;
        if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size);
        ctx.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal());
    }

    function animatePetals() {
      ctx.clearRect(0, 0, width, height);
      for (const p of petals) {
        p.update();
        p.draw();
      }
      requestAnimationFrame(animatePetals);
    }
    animatePetals();

    /* ==========================================================
       3. CATEGORY FILTERS FOR "NOS SOINS"
    ========================================================== */
    function filterServices(category) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      const activeBtn = Array.from(document.querySelectorAll('.filter-btn')).find(b => b.getAttribute('onclick').includes(category));
      if (activeBtn) activeBtn.classList.add('active');

      const cards = document.querySelectorAll('.soin-card');
      cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    }

    /* ==========================================================
       4. MOBILE CAROUSEL & NAVIGATION
    ========================================================== */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');

    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });

    function closeDrawer() {
      mobileDrawer.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    const mainHeader = document.getElementById('mainHeader');
    
    // Bulletproof smooth scroll handler
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href').substring(1);
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        // Update URL hash without jumping
        history.pushState(null, '', '#' + targetId);
        // If mobile drawer open, close it
        if (typeof closeDrawer === 'function') closeDrawer();
      }
    });


    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }, { passive: true });

    function scrollCarousel(direction) {
      const carousel = document.getElementById('soinsCarousel');
      const cardWidth = carousel.querySelector('.soin-card').offsetWidth + 14;
      carousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
    }

    /* ==========================================================
       5. MODALS (Booking, Video, Image Preview)
    ========================================================= */
    const bookingModal = document.getElementById('bookingModal');
    const selectedServiceSelect = document.getElementById('selectedService');

    function openBookingModal(serviceName) {
      if (serviceName) {
        for (let i = 0; i < selectedServiceSelect.options.length; i++) {
          if (selectedServiceSelect.options[i].value.includes(serviceName)) {
            selectedServiceSelect.selectedIndex = i;
            break;
          }
        }
      }
      bookingModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeBookingModal() {
      bookingModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    function handleBackdropClick(e) {
      if (e.target === bookingModal) closeBookingModal();
    }

    function bookSpecificService(name) {
      openBookingModal(name);
    }

    function submitBooking(e) {
      e.preventDefault();
      const name = document.getElementById('clientName').value.trim();
      const service = selectedServiceSelect.value;
      const date = document.getElementById('bookingDate').value;

      let msg = (currentLang === 'ar')
        ? `السلام عليكم، أنا ${name}، أود حجز جلسة: *${service}*`
        : `Bonjour JOVEN, je m'appelle ${name} et je souhaite réserver la séance : *${service}*`;

      if (date) {
        msg += (currentLang === 'ar') ? ` بتاريخ: ${date}` : ` pour le ${date}`;
      }
      msg += (currentLang === 'ar') ? `. شكراً لكم.` : `. Merci beaucoup !`;

      const waUrl = `https://wa.me/213781088061?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      closeBookingModal();
    }

    // Video modal
    const videoModal = document.getElementById('videoModal');
    const modalVideoPlayer = document.getElementById('modalVideoPlayer');


    function openVideoModal(videoSrc) {
      modalVideoPlayer.src = videoSrc;
      videoModal.classList.add('open');
      modalVideoPlayer.play().catch(() => {});
      document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
      modalVideoPlayer.pause();
      modalVideoPlayer.src = '';
      videoModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    function handleVideoBackdropClick(e) {
      if (e.target === videoModal) closeVideoModal();
    }

    // Image preview modal
    const imageModal = document.getElementById('imageModal');
    const modalImageViewer = document.getElementById('modalImageViewer');
    const modalImageCaption = document.getElementById('modalImageCaption');

    function openImageModal(imgSrc, caption) {
      modalImageViewer.src = imgSrc;
      modalImageCaption.textContent = caption || '';
      imageModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeImageModal() {
      imageModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    function handleImageBackdropClick(e) {
      if (e.target === imageModal) closeImageModal();
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeBookingModal();
        closeVideoModal();
        closeImageModal();
      }
    });

    // 6. Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu .nav-item');

    window.addEventListener('scroll', () => {
      let currentSection = '';
      const scrollY = window.pageYOffset;

      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentSection = sec.getAttribute('id');
        }
      });

      navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.getAttribute('href') === `#${currentSection}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }, { passive: true });
  
    /* ============================================================
       HERO VIDEO CONTROLS & LUXURY FEMININE PARTICLES
    ============================================================ */
    function toggleHeroSound() {
      const vid = document.getElementById('heroSalonVideo');
      const soundBtn = document.getElementById('heroSoundBtn');
      const soundIcon = document.getElementById('heroSoundIcon');
      const soundText = document.getElementById('heroSoundText');
      if (!vid) return;

      const dict = I18N[currentLang] || I18N.fr;

      if (vid.muted) {
        vid.muted = false;
        vid.volume = 0.85;
        if (soundIcon) soundIcon.textContent = '🔊';
        if (soundText) soundText.textContent = dict.btn_mute || 'Couper le son';
        if (soundBtn) soundBtn.style.background = '#944057';
      } else {
        vid.muted = true;
        if (soundIcon) soundIcon.textContent = '🔇';
        if (soundText) soundText.textContent = dict.btn_unmute || 'Activer le son';
        if (soundBtn) soundBtn.style.background = 'rgba(255, 255, 255, 0.18)';
      }
    }

    function toggleHeroPlay() {
      const vid = document.getElementById('heroSalonVideo');
      const playIcon = document.getElementById('heroPlayIcon');
      if (!vid) return;

      if (vid.paused) {
        vid.play();
        if (playIcon) playIcon.textContent = '⏸';
      } else {
        vid.pause();
        if (playIcon) playIcon.textContent = '▶';
      }
    }

    function openHeroFullscreen() {
      const vid = document.getElementById('heroSalonVideo');
      if (!vid) return;
      if (vid.requestFullscreen) {
        vid.requestFullscreen();
      } else if (vid.webkitRequestFullscreen) {
        vid.webkitRequestFullscreen();
      } else if (vid.msRequestFullscreen) {
        vid.msRequestFullscreen();
      }
    }

    // Touch/click directly on video to toggle play/pause
    document.addEventListener('DOMContentLoaded', () => {
      const vid = document.getElementById('heroSalonVideo');
      if (vid) {
        vid.addEventListener('click', toggleHeroPlay);
      }
      initLuxurySparkles();
      syncSalonConfigLive();
    });

    // Subtle Luxury Sparkles Particles Canvas
    function initLuxurySparkles() {
      const canvas = document.getElementById('luxurySparklesCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width, height;
      function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      const particles = [];
      const particleCount = window.innerWidth < 768 ? 16 : 28;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2.2 + 0.8,
          color: Math.random() > 0.5 ? 'rgba(194, 147, 85, ' : 'rgba(235, 178, 193, ',
          opacity: Math.random() * 0.5 + 0.2,
          speedY: Math.random() * 0.4 + 0.15,
          speedX: (Math.random() - 0.5) * 0.25,
          pulse: Math.random() * Math.PI,
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }

      function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let p of particles) {
          p.pulse += p.pulseSpeed;
          const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.2;
          const boundedOpacity = Math.max(0.1, Math.min(0.8, currentOpacity));

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color + boundedOpacity + ')';
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color + '0.5)';
          ctx.fill();

          p.y -= p.speedY;
          p.x += p.speedX;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        requestAnimationFrame(draw);
      }
      draw();
    }

    // Live Sync Salon Config (Hero video, Phone, Address, etc.) from Supabase
    async function syncSalonConfigLive() {
      if (typeof supabaseClient === 'undefined' || !supabaseClient) return;
      try {
        const { data, error } = await supabaseClient.from('admin_config').select('*');
        if (error || !data) return;

        const configMap = {};
        data.forEach(item => { configMap[item.key] = item.value; });

        // Update Hero Video if changed
        if (configMap.hero_video_url) {
          const heroVid = document.getElementById('heroSalonVideo');
          if (heroVid && heroVid.src !== configMap.hero_video_url) {
            heroVid.src = configMap.hero_video_url;
            if (configMap.hero_poster_url) heroVid.poster = configMap.hero_poster_url;
          }
        }

        // Update WhatsApp links
        if (configMap.whatsapp_number) {
          const waNum = configMap.whatsapp_number.replace(/[^0-9]/g, '');
          document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            const currentHref = link.getAttribute('href');
            link.setAttribute('href', currentHref.replace(/wa\.me\/\d+/, 'wa.me/' + waNum));
          });
        }
      } catch (err) {
        console.warn('Live config sync warning:', err);
      }
    }

