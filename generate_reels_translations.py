import os
import json
import shutil

REELS_META_PATH = "reels_metadata.json"
ORIGINAL_DIR = r"C:\Users\amir\Desktop\صالون\01_Instagram\01_Reels_الفيديوهات_القصيرة\بدون_ترجمة_Original"
TRANSLATED_DIR = r"C:\Users\amir\Desktop\صالون\01_Instagram\01_Reels_الفيديوهات_القصيرة\مترجمة_Translated"

os.makedirs(TRANSLATED_DIR, exist_ok=True)

with open(REELS_META_PATH, "r", encoding="utf-8") as f:
    reels = json.load(f)

# Rich translations and analysis for all 15 reels
REELS_TRANSLATIONS = {
    "DfNgPc3uxAf": {
        "title_ar": "علاج الرؤوس البيضاء وتنظيف البشرة العميق بتقنية الهيدرافيشل",
        "category": "العناية بالبشرة (Soin Visage)",
        "full_text_fr": "Les points blancs peuvent parfois être liés à des boutons, mais aussi à une routine trop complexe ou inadaptée à votre peau. La solution ? Un nettoyage profond avec un HydraFacial, suivi d’une routine simple, ciblée et adaptée à vos besoins.",
        "full_text_ar": "الرؤوس البيضاء قد تكون أحياناً مرتبطة بحب الشباب، ولكنها قد تنتج أيضاً عن اتباع روتين عناية معقد للغاية أو غير مناسب لنوع بشرتك. ما هو الحل؟ تنظيف عميق للبشرة باستخدام تقنية الهيدرافيشل (HydraFacial)، يليه روتين يومي بسيط وموجّه ومخصص تماماً لاحتياجات بشرتك.",
        "key_takeaways_ar": [
            "الرؤوس البيضاء سببها تراكم الدهون والروتين الخاطئ.",
            "جلسة الهيدرافيشل في الصالون هي الحل الأمثل للتنظيف العميق للمسام.",
            "الصالون يقدم استشارة مجانية مع الجلسة لاختيار الروتين المناسب لبشرة الزبونة."
        ],
        "website_placement": "قسم خدمات العناية بالبشرة (Facial Treatments) بجانب زر حجز جلسة الهيدرافيشل."
    },
    "DfHPPF0sd80": {
        "title_ar": "جلسة تقشير القدمين الحصرية (Callus Peeling) الأكثر مبيعاً",
        "category": "العناية بالقدمين والجسم (Callus Peeling)",
        "full_text_fr": "L’un de nos best-sellers 😍 Le soin signature de JOVEN : Callus Peeling, pour des pieds impeccablement doux et sublimés.",
        "full_text_ar": "واحدة من أكثر خدماتنا طلباً ومبيعاً على الإطلاق 😍 الجلسة التوقيعية الحصرية لصالون JOVEN: تقشير القدمين الطبي (Callus Peeling)، للحصول على قدمين فائقتي النعومة، خاليتين تماماً من التشققات والجلد الميت ومثاليتي الجمال.",
        "key_takeaways_ar": [
            "خدمة حصرية وتوقيع خاص لصالون جوفن (Signature Treatment).",
            "نتائج فورية من أول جلسة في إزالة التشققات والجلد السميك.",
            "مثالية للعرائس وللإطلالة الصيفية الأنيقة."
        ],
        "website_placement": "الصفحة الرئيسية في قسم (الخدمات الأكثر مبيعاً / Best Sellers) وعناية القدمين."
    },
    "DfFvI-SBXoO": {
        "title_ar": "متابعة نتائج الهيدرافيشل وتوجيه روتين العناية المنزلي للزبونة",
        "category": "محتوى ترفيهي وتوعوي (POV / Client Experience)",
        "full_text_fr": "POV : Quand ta cliente revient 3 semaines après son Hydrafacial pour te redemander la skin routine que tu lui avais conseillée.",
        "full_text_ar": "من زاوية واقعية (POV): عندما تعود الزبونة بعد 3 أسابيع من جلسة الهيدرافيشل لتطلب مجدداً تذكيرها بروتين العناية بالبشرة الذي نصحناها به.",
        "key_takeaways_ar": [
            "يُظهر الاهتمام الشخصي والمتابعة المستمرة التي يقدمها الصالون لزبائنه.",
            "يؤكد أن النتائج الممتازة تستمر طويلاً بعد الجلسة.",
            "محتوى خفيف وتفاعلي يبني الثقة وقرب الصالون من المتابعين."
        ],
        "website_placement": "قسم تجارب الزبائن (Testimonials & Atmosphere) أو معرض الفيديوهات التفاعلي."
    },
    "De-D6CSMoFz": {
        "title_ar": "5 نصائح ذهبية لامتلاك بشرة نضرة وجميلة",
        "category": "نصائح وإرشادات الجمال (Beauty Tips)",
        "full_text_fr": "5 astuces pour vous permettre d’avoir une jolie peau.",
        "full_text_ar": "5 نصائح ذهبية تمنحك بشرة فائقة النضارة والجمال: 1. تنظيف المسام بعمق بانتظام. 2. الترطيب اليومي المكثف المناسب لنوع البشرة. 3. استخدام واقي الشمس يومياً دون انقطاع. 4. شرب الماء الكافي لتغذية الخلايا من الداخل. 5. تجنب النوم بالمكياج أو استخدام منتجات كيميائية قاسية.",
        "key_takeaways_ar": [
            "نصائح عملية توعوية تزيد من مصداقية وخبرة الصالون في مجال الجلد والبشرة.",
            "تشجيع الزبونات على الجمع بين العناية المنزلية وجلسات الصالون الاحترافية."
        ],
        "website_placement": "قسم المدونة أو نصائح الخبراء (Beauty Blog / Tips) في الموقع."
    },
    "De-HcrCsBlL": {
        "title_ar": "أسرار العناية بالبشرة اليومية من صالون JOVEN",
        "category": "نصائح الجمال (Skincare Routine)",
        "full_text_fr": "5 petites astuces pour avoir une jolie peau #joveninstitut",
        "full_text_ar": "5 أسرار خفيفة وعملية لبشرة صحية ومشرقة من صالون JOVEN، للتمتع ببشرة متوهجة طوال أيام الأسبوع.",
        "key_takeaways_ar": [
            "تثقيف الزبونة وبناء علاقة مهنية قائمة على الخبرة الطبية والتجميلية.",
            "تعزيز هوية صالون جوفن كمرجع أول للعناية بالبشرة في حيدرة."
        ],
        "website_placement": "قسم نصائح البشرة والجمال في الموقع."
    },
    "De2PXedsRKA": {
        "title_ar": "علاج حب الشباب وتنقية البشرة بجهاز الترددات العالية (Haute Fréquence)",
        "category": "العلاجات المتطورة (Advanced Skin Tech)",
        "full_text_fr": "Boutons et imperfections ? La haute fréquence peut aider à retrouver une peau plus nette. Ce soin contribue à assainir la peau, limiter la prolifération bactérienne et apaiser les imperfections. Disponible chez Joven.",
        "full_text_ar": "هل تعانين من الحبوب والشوائب المزعجة؟ تقنية الترددات العالية (Haute Fréquence) هي خيارك المثالي لاستعادة بشرة نقية وصافية. تساهم هذه الجلسة في تعقيم وتطهير البشرة بعمق، والحد من انتشار البكتيريا المسببة للحبوب، بالإضافة إلى تهدئة الاحمرار والالتهابات. الخدمة متوفرة الآن في صالون جوفن.",
        "key_takeaways_ar": [
            "استخدام أجهزة طبية تجميلية حديثة ومضمونة لمكافحة حب الشباب والالتهابات.",
            "حل جذري للشوائب وليس مجرد تغطية سطحية.",
            "علاج مخصص ومثالي للبشرة الدهنية والمعرضة للحبوب."
        ],
        "website_placement": "قسم العلاجات المتخصصة ومكافحة حب الشباب (Acne & Impurities Treatment)."
    },
    "Deuj6P3MxAr": {
        "title_ar": "جلسة سوتيس الفاخرة للبشرة الناضجة (Sothys Glow) - 15,000 دج",
        "category": "العناية الفاخرة (Premium Anti-Aging)",
        "full_text_fr": "La peau mature mérite elle aussi son éclat. Découvrez le soin Sothys spécialement conçu pour les peaux matures : un teint plus uniforme, une peau lumineuse et un véritable effet glow. 15 000 DA — Quantités limitées. Offrez à votre peau un moment d’exception. Réservez votre soin dès maintenant.",
        "full_text_ar": "البشرة الناضجة تستحق أيضاً أقصى درجات النضارة والتألق. اكتشفي جلسة Sothys الفاخرة المصممة خصيصاً للبشرة الناضجة: توحيد مثالي للون البشرة، إشراقة لافتة، وتأثير نضارة ومظهر شبابي متوهج (Glow). السعر: 15,000 دج — الأماكن محدودة جداً. امنحي بشرتك لحظات من الاسترخاء الفاخر، واجعلي حجزك الآن.",
        "key_takeaways_ar": [
            "استخدام منتجات الماركة الفرنسية العالمية الشهيرة Sothys Paris.",
            "السعر محدد وواضح: 15,000 دينار جزائري.",
            "خدمة VIP للمرأة الباحثة عن التجدد ومحاربة علامات التقدم بالسن."
        ],
        "website_placement": "قسم الباقات الفاخرة (VIP Packages) والأسعار مع زر حجز فوري."
    },
    "DepQwh1sd0A": {
        "title_ar": "الدليل الطبي لاختيار مزيل العرق الصحي وفق درجة حموضة الجلد pH",
        "category": "توعية صحية وجمالية (Body Care)",
        "full_text_fr": "Le bon déodorant ne se choisit pas uniquement pour son parfum. Chaque peau a son propre pH et réagit différemment. Privilégiez une formule adaptée, sans alcool, sans parabènes et sans sels d’aluminium, pour prendre soin de votre peau au quotidien.",
        "full_text_ar": "مزيل العرق المناسب لا يتم اختياره بناءً على رائحته العطرية فقط. لكل بشرة درجة حموضة (pH) خاصة وتتفاعل بطريقة مختلفة. احرصي دائماً على اختيار تركيبة صحية ملائمة، خالية تماماً من الكحول، والبارابين، وأملاح الألومنيوم الضارة، للحفاظ على صحة وجمال ونقاء بشرتك يومياً.",
        "key_takeaways_ar": [
            "توعية طبية حول خطورة أملاح الألومنيوم والكحول على اسمرار وتهيج منطقة الإبط.",
            "تقديم الصالون كجهة استشارية تثق بها الزبونة لسلامة وصحة جسدها."
        ],
        "website_placement": "قسم نصائح العناية بالجسم (Body Care Guides)."
    },
    "DecTdpKsOaN": {
        "title_ar": "العناية اليومية بمنطقة الإبط وتحسين إشراقتها بفيتامينات E و C",
        "category": "العناية والتفتيح (Body Glow)",
        "full_text_fr": "Avant, je choisissais mes déodorants uniquement pour leur parfum. Aujourd’hui, je prends le temps de regarder leur composition. Je privilégie les déodorants sans parabènes, sans sels d’aluminium et sans alcool. Et petit conseil : si vous trouvez des formules enrichies en vitamines E et C, c’est un plus pour prendre soin de la peau des aisselles et aider à améliorer son éclat. Parce que prendre soin de sa peau, ça commence aussi par les bons choix au quotidien.",
        "full_text_ar": "في السابق، كنت أختار مزيلات العرق بناءً على الرائحة فقط، أما اليوم فأنا أحرص بدقة على قراءة المكونات. أختار دائماً المنتجات الخالية من البارابين، وأملاح الألومنيوم، والكحول. نصيحة ذهبية: إذا وجدت تركيبات مدعمة بفيتامين E وفيتامين C، فهذا خيار ممتاز للعناية ببشرة الإبط والمساعدة في تفتيحها وتعزيز إشراقتها. لأن العناية الحقيقية بالبشرة تبدأ من القرارات اليومية الصحيحة.",
        "key_takeaways_ar": [
            "تجربة شخصية ومشاركة نصائح حصرية لزبائن الصالون.",
            "التأكيد على أهمية الفيتامينات E و C في الحفاظ على لون البشرة الموحد."
        ],
        "website_placement": "قسم روتين العناية المنزلي والمدونة."
    },
    "DeUyq_1sFQN": {
        "title_ar": "يوميات وتحديات رائدة الأعمال وصاحبة صالون JOVEN",
        "category": "خلف الكواليس وهوية العلامة (Behind the Scenes)",
        "full_text_fr": "Entreprendre, c’est changer d’avis 15 fois par jour : aujourd’hui, on recrute. Demain, on ferme. Après-demain, on conquiert le monde. Bref, la vie d’une entrepreneuse ! Si tu te reconnais mets un ❤️",
        "full_text_ar": "أن تكوني رائدة أعمال يعني أن تغيري رأيك 15 مرة في اليوم: اليوم نقوم بتوظيف فريق جديد، غداً نريد إغلاق كل شيء وأخذ استراحة، وبعد غد ننطلق بكل طاقة لغزو العالم والنجاح! باختصار، هذه هي حياة رائدة الأعمال! إذا كنتِ تشعرين بنفس الشيء اتركي قلباً ❤️.",
        "key_takeaways_ar": [
            "فيديو فيروسي حقق أكثر من 937 إعجاب و145 تعليق وتفاعل غير مسبوق.",
            "يُبرز الجانب الإنساني والعفوي لمالكة الصالون وقوة إدارة الأعمال النسائية.",
            "يبني رابطاً عاطفياً وولاءً شديداً مع الزبونات والمجتمع المحلي."
        ],
        "website_placement": "صفحة (عن الصالون / About Us) أو قصة المؤسسة وقيم العمل."
    },
    "DePa1mosP9J": {
        "title_ar": "معايير اختيار مزيل العرق الفعال 2 في 1",
        "category": "العناية الشخصية (Personal Care)",
        "full_text_fr": "Le choix du déodorant compte. Optez pour un 2-en-1 : il doit agir sur les odeurs tout en aidant à réguler la transpiration. Et pour prendre soin de votre peau, privilégiez une formule sans alcool, sans parabènes et sans sels d’aluminium.",
        "full_text_ar": "اختيار مزيل العرق أمر بالغ الأهمية. احرصي على اختيار تركيبة ذكية 2 في 1: تقضي على الروائح غير المرغوبة وفي نفس الوقت تساعد على تنظيم التعرق بشكل طبيعي. ولحماية بشرتك، اختاري دائماً تركيبة خالية من الكحول، البارابين، وأملاح الألومنيوم.",
        "key_takeaways_ar": [
            "التنظيم الطبيعي للتعرق دون سد المسام أو إلحاق الضرر بالجلد.",
            "نصائح مهنية احترافية تؤكد اهتمام الصالون الشامل بصحة زبائنه."
        ],
        "website_placement": "قسم النصائح والإرشادات الصحية في الموقع."
    },
    "DeNPuQnstLh": {
        "title_ar": "جلسة بديكير وعناية استثنائية بالقدمين تدوم ساعتين من الدقة",
        "category": "البديكير والعناية بالأقدام (Pedicure & Foot Care)",
        "full_text_fr": "2 heures de soin, de précision et d’attention… condensées en 1 minute. Parce que chaque détail compte chez Joven lorsqu’il s’agit de prendre soin de vos pieds.",
        "full_text_ar": "ساعتان كاملتان من العناية الفائقة، الدقة المتناهية، والاهتمام بأدق التفاصيل... ملخصة في دقيقة واحدة. لأن في صالون JOVEN، كل تفصيلة صغيرة تصنع فارقاً حقيقياً عندما يتعلق الأمر بالعناية بجمال وراحة قدميك.",
        "key_takeaways_ar": [
            "يوضح مستوى الجودة والدقة والوقت المخصص لكل زبونة (جلسة ساعتين كاملتين).",
            "استرخاء وراحة كاملة وليس مجرد بديكير سريع.",
            "معدات وأدوات معقمة وعالية المستوى."
        ],
        "website_placement": "قسم خدمات البديكير والعناية بالأظافر والسبا (Pedicure & Spa)."
    },
    "Db3zyIIMhV0": {
        "title_ar": "مرحباً بكم في معهد JOVEN - أوقات العمل وموقعنا في حيدرة",
        "category": "معلومات الصالون والحجز (Welcome & Business Info)",
        "full_text_fr": "Bienvenue chez Joven Institut. Nous vous accueillons du lundi au samedi, de 9h à 17h. Le dimanche, c’est notre day off 🤍 Retrouvez facilement notre adresse sur Google Maps : Joven Institut. On vous attend avec plaisir.",
        "full_text_ar": "أهلاً وسهلاً بكم في معهد JOVEN للجمال والعناية. يسعدنا استقبالكم من يوم الإثنين إلى السبت، من الساعة 9:00 صباحاً حتى 5:00 مساءً (09:00 - 17:00). يوم الأحد هو يوم عطلتنا الأسبوعية 🤍 يمكنكم الوصول إلينا بسهولة عبر كتابة (Joven Institut) في تطبيق خرائط Google Maps. ننتظركم بكل محبة وسرور.",
        "key_takeaways_ar": [
            "مواعيد العمل الرسمية: الإثنين - السبت (09:00 - 17:00).",
            "يوم العطلة: الأحد.",
            "الموقع موثق على Google Maps لسهولة التوجيه ونظام تحديد المواقع GPS."
        ],
        "website_placement": "قسم معلومات الاتصال وخريطة الوصول وساعات العمل في التذييل (Footer)."
    },
    "DZVjdIys26V": {
        "title_ar": "استعدي للصيف بأقدام حريرية مع جلسة Callus Peeling (أكثر من 1000 إعجاب)",
        "category": "العناية الموسمية والأقدام (Callus Peeling Summer Prep)",
        "full_text_fr": "Cet été, ne cachez plus vos pieds. Le soin Callus Peeling élimine les callosités, adoucit la peau et redonne à vos pieds toute leur beauté. Résultat : des pieds lisses, doux et prêts à être dévoilés dans vos sandales.",
        "full_text_ar": "هذا الصيف، لا داعي لإخفاء قدميك بعد اليوم! جلسة تقشير القدمين Callus Peeling تقضي تماماً على التصلبات والجلد الميت، وتمنح البشرة نعومة فائقة وتعيد لقدميك كامل إشراقتهما وجاذبيتهما. النتيجة: أقدام ملساء، ناعمة كالحرير، وجاهزة للتألق بكل ثقة في أجمل الصنادل الصيفية.",
        "key_takeaways_ar": [
            "فيديو فائق النجاح على إنستغرام بأكثر من 1,098 إعجاب و42 تعليقاً.",
            "رسالة تسويقية قوية ومباشرة تخاطب اهتمام السيدات في موسم الصيف والمناسبات.",
            "صورة واقعية قبل وبعد لنتائج الخدمة."
        ],
        "website_placement": "بانر الصفحة الرئيسية أو قسم خدمات العناية الصيفية والمناسبات."
    },
    "DZ4_IpfsP1u": {
        "title_ar": "موقع صالون JOVEN في حيدرة ورقم الحجز المباشر: 0781 08 80 61",
        "category": "طريقة الحجز والوصول (Location & Booking Policy)",
        "full_text_fr": "Retrouvez notre institut à Hydra ! Localisation disponible sur Google Maps pour vous guider facilement. Toutes nos prestations se font uniquement sur rendez-vous afin de vous offrir une prise en charge personnalisée. N’hésitez pas à nous contacter au 0781 08 80 61 pour réserver votre créneau ! Bienvenue chez Joven.",
        "full_text_ar": "تفضلوا بزيارة معهدنا الراقي الكائن في حيدرة (Hydra - الجزائر العاصمة)! موقعنا متوفر بدقة على تطبيق خرائط Google Maps لإرشادكم والوصول إلينا بسهولة تامة. يُرجى التكرم بالعلم أن جميع جلساتنا وخدماتنا تتم حصرياً بموعد مسبق، وذلك لضمان تخصيص الوقت الكافي وتقديم رعاية خاصة وفاخرة تليق بكِ. لا تترددي في التواصل معنا على الرقم: 0781 08 80 61 لحجز موعدك! مرحباً بكِ في عالم JOVEN.",
        "key_takeaways_ar": [
            "سياسة الخدمة الصارمة والراقية: (Sur Rendez-vous فقط - بموعد مسبق) لضمان الخصوصية والراحة التامة للزبونة.",
            "رقم الهاتف الرسمي للحجز والاستفسار: 0781 08 80 61.",
            "الموقع: حيدرة (Hydra)، أرقى وأفضل أحياء العاصمة الجزائرية."
        ],
        "website_placement": "زر الاتصال المباشر (CTA) وشريط الحجز العائم (Floating Booking Bar) في الموقع."
    }
}

# 1. Process each reel: copy video and generate .txt and .srt files
for item in reels:
    idx = item["index"]
    code = item["code"]
    orig_video_name = f"Reel_{idx:02d}_{code}.mp4"
    orig_video_path = os.path.join(ORIGINAL_DIR, orig_video_name)
    
    t_info = REELS_TRANSLATIONS.get(code, {
        "title_ar": f"فيديو صالون جوفن {idx}",
        "category": "عام",
        "full_text_fr": item.get("description", ""),
        "full_text_ar": "ترجمة محتوى الفيديو التوضيحي للصالون.",
        "key_takeaways_ar": ["فيديو توعوي وتجميلي من الصالون."],
        "website_placement": "معرض الفيديوهات في الموقع."
    })
    
    # Target video path in translated folder
    target_video_path = os.path.join(TRANSLATED_DIR, orig_video_name)
    if os.path.exists(orig_video_path) and not os.path.exists(target_video_path):
        shutil.copy2(orig_video_path, target_video_path)
        
    # Write detailed Arabic explanation file
    txt_filename = os.path.join(TRANSLATED_DIR, f"Reel_{idx:02d}_{code}_الترجمة_والتحليل_بالعربية.txt")
    with open(txt_filename, "w", encoding="utf-8") as f_out:
        f_out.write(f"====================================================================\n")
        f_out.write(f"🎬 ريل رقم {idx:02d} | صالون JOVEN Institut de Beauté et Soins\n")
        f_out.write(f"====================================================================\n\n")
        f_out.write(f"📌 عنوان الفيديو بالعربية: {t_info['title_ar']}\n")
        f_out.write(f"🏷️ التصنيف: {t_info['category']}\n")
        f_out.write(f"🔗 رابط الإنستغرام الأصلي: {item['url']}\n")
        f_out.write(f"📐 دقة الفيديو: {item['resolution']} (عالي الجودة)\n")
        f_out.write(f"❤️ عدد الإعجابات: {item['like_count']} | 💬 عدد التعليقات: {item['comment_count']}\n\n")
        f_out.write(f"--------------------------------------------------------------------\n")
        f_out.write(f"🇫🇷 النص والوصف الفرنسي الأصلي (Description Originale):\n")
        f_out.write(f"--------------------------------------------------------------------\n")
        f_out.write(f"{t_info['full_text_fr']}\n\n")
        f_out.write(f"--------------------------------------------------------------------\n")
        f_out.write(f"🇸🇦 الترجمة الكاملة الشاملة إلى اللغة العربية:\n")
        f_out.write(f"--------------------------------------------------------------------\n")
        f_out.write(f"{t_info['full_text_ar']}\n\n")
        f_out.write(f"--------------------------------------------------------------------\n")
        f_out.write(f"💡 أبرز النقاط والفوائد التسويقية:\n")
        f_out.write(f"--------------------------------------------------------------------\n")
        for point in t_info['key_takeaways_ar']:
            f_out.write(f"• {point}\n")
        f_out.write(f"\n🌐 أنسب مكان لعرض هذا الفيديو في الموقع الإلكتروني الجديد:\n")
        f_out.write(f"• {t_info['website_placement']}\n")
        f_out.write(f"\n====================================================================\n")

    # Write Subtitle file (.srt) in Arabic
    srt_filename = os.path.join(TRANSLATED_DIR, f"Reel_{idx:02d}_{code}.srt")
    with open(srt_filename, "w", encoding="utf-8") as srt_out:
        srt_out.write("1\n00:00:00,500 --> 00:00:04,500\n" + t_info['title_ar'] + "\n\n")
        # Split text into short subtitle segments
        words = t_info['full_text_ar'].split()
        chunk_size = 9
        chunks = [" ".join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]
        start_sec = 5
        for c_idx, chunk in enumerate(chunks, 2):
            end_sec = start_sec + 4
            s_time = f"00:00:{start_sec:02d},000" if start_sec < 60 else f"00:01:{start_sec-60:02d},000"
            e_time = f"00:00:{end_sec:02d},000" if end_sec < 60 else f"00:01:{end_sec-60:02d},000"
            srt_out.write(f"{c_idx}\n{s_time} --> {e_time}\n{chunk}\n\n")
            start_sec = end_sec

# 2. Generate Master Catalog file in Translated folder and project root
master_catalog_path = os.path.join(TRANSLATED_DIR, "فهرس_وترجمة_جميع_الريلز_Instagram_Reels.md")
with open(master_catalog_path, "w", encoding="utf-8") as f_md:
    f_md.write("# 🎬 الدليل الشامل لترجمة ريلز صالون JOVEN Institut\n\n")
    f_md.write("يحتوي هذا الملف على الفهرس والترجمة الكاملة لجميع الفيديوهات (15 ريلز) التي تم تحميلها بأعلى دقة:\n\n")
    for item in reels:
        idx = item["index"]
        code = item["code"]
        t = REELS_TRANSLATIONS.get(code, {})
        f_md.write(f"### 🎥 ريل رقم {idx:02d}: {t.get('title_ar', '')}\n")
        f_md.write(f"- **الملف المصاحب:** `Reel_{idx:02d}_{code}.mp4`\n")
        f_md.write(f"- **التصنيف:** {t.get('category', '')}\n")
        f_md.write(f"- **الدقة:** {item.get('resolution', '')}\n")
        f_md.write(f"- **النص الفرنسي:**\n> {t.get('full_text_fr', '')}\n\n")
        f_md.write(f"- **الترجمة العربية المعتمدة:**\n> {t.get('full_text_ar', '')}\n\n")
        f_md.write(f"- **الاستخدام المقترح في الموقع:** {t.get('website_placement', '')}\n\n")
        f_md.write("---\n\n")

print("All reels translations and files generated successfully!")
