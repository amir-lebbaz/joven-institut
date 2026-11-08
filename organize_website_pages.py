import os
import shutil
import json

BASE_DESKTOP = r"C:\Users\amir\Desktop\صالون"
ORGANIZED_DIR = os.path.join(BASE_DESKTOP, "05_تنظيم_الموقع_حسب_الصفحات")

# Source paths
REELS_ORIG_DIR = os.path.join(BASE_DESKTOP, r"01_Instagram\01_Reels_الفيديوهات_القصيرة\بدون_ترجمة_Original")
REELS_TRANS_DIR = os.path.join(BASE_DESKTOP, r"01_Instagram\01_Reels_الفيديوهات_القصيرة\مترجمة_Translated")
HIGHLIGHTS_DIR = os.path.join(BASE_DESKTOP, r"01_Instagram\03_Highlights_الهايلاتات")
MAPS_PHOTOS_DIR = os.path.join(BASE_DESKTOP, r"02_Google_Maps\01_الصور_العامة_Photos")
MAPS_360_DIR = os.path.join(BASE_DESKTOP, r"02_Google_Maps\02_صور_وفيديوهات_360_درجة_360_Views")

# Structure definition with rationale and target files
PAGES_CONFIG = {
    "01_الصفحة_الرئيسية_Homepage": {
        "title": "الصفحة الرئيسية (Homepage - Landing Page)",
        "mission": "الهدف منها إبهار الزائرة في أول 3 ثوانٍ، بناء الثقة الفورية، واستعراض الخدمات الأقوى التي تميز الصالون في حيدرة لدفعها نحو الحجز المباشر.",
        "subsections": [
            {
                "subfolder": "01_قسم_الهيرو_والواجهة_Hero",
                "role": "الواجهة الأولى في الموقع (Hero Banner) لإعطاء انطباع بالفخامة والهدوء والاحترافية.",
                "files_to_copy": [
                    (os.path.join(MAPS_PHOTOS_DIR, "Photo_01.jpg"), "01_صورة_الصالون_الرئيسية_Hero_Interior.jpg"),
                    (os.path.join(REELS_ORIG_DIR, "Reel_13_Db3zyIIMhV0.mp4"), "02_فيديو_ترحيب_بالمعهد_Welcome_Joven.mp4"),
                    (os.path.join(MAPS_360_DIR, "01_واجهة_المدخل_الرئيسي_Entrance.jpg"), "03_صورة_المدخل_الخارجي_Facade.jpg")
                ],
                "action_and_text": "عنوان عريض: 'فخامة العناية... وإشراقة بشرتكِ الاستثنائية' | شريط معلومات: حيدرة (Hydra) - تقييم 4.9/5 - حجز مسبق VIP."
            },
            {
                "subfolder": "02_أبرز_الخدمات_الأكثر_طلباً_Best_Sellers",
                "role": "عرض أقوى 3 خدمات تحقق مبيعات وإقبالاً ساحقاً للصالون (Callus Peeling, Hydrafacial, Sothys Glow).",
                "files_to_copy": [
                    (os.path.join(REELS_ORIG_DIR, "Reel_14_DZVjdIys26V.mp4"), "01_فيديو_تقشير_القدمين_الفيروسي_1000likes.mp4"),
                    (os.path.join(REELS_ORIG_DIR, "Reel_01_DfNgPc3uxAf.mp4"), "02_فيديو_الهيدرافيشل_تنظيف_عميق.mp4"),
                    (os.path.join(REELS_ORIG_DIR, "Reel_07_Deuj6P3MxAr.mp4"), "03_فيديو_جلسة_سوتيس_للبشرة_الناضجة_15k.mp4"),
                    (os.path.join(HIGHLIGHTS_DIR, r"06_Callus_Peeling_تقشير_القدمين\Slide_01.jpg"), "04_صورة_نتيجة_Callus_Peeling.jpg"),
                    (os.path.join(HIGHLIGHTS_DIR, r"07_Hydrafacial_جلسات_الهيدraفيشل\Slide_01.jpg" if not os.path.exists(os.path.join(HIGHLIGHTS_DIR, r"07_Hydrafacial_جلسات_الهيدraفيشل")) else ""), "05_صورة_نتيجة_Hydrafacial.jpg")
                ],
                "action_and_text": "كروت الخدمات الأكثر مبيعاً مع زر مباشر: [احجزي هذه الجلسة] مع إبراز السعر الشفاف (15,000 دج لجلسة Sothys)."
            },
            {
                "subfolder": "03_الجولة_الافتراضية_360_Virtual_Tour",
                "role": "إثبات واقعي للصالون وموقعه الراقي في حيدرة وتشجيع الزبونة على الشعور بالاطمئنان والراحة قبل الحضور.",
                "files_to_copy": [
                    (os.path.join(MAPS_360_DIR, "فيديو_جولة_360_درجة_محيط_الصالون_JOVEN_360.mp4"), "01_فيديو_دوران_360_لمحيط_الصالون.mp4"),
                    (os.path.join(MAPS_360_DIR, "عرض_تفاعلي_360_درجة_Interactive.html"), "02_العرض_التفاعلي_360_للتضمين.html"),
                    (os.path.join(REELS_ORIG_DIR, "Reel_15_DZ4_IpfsP1u.mp4"), "03_فيديو_الموقع_في_حيدرة_ورقم_الحجز.mp4")
                ],
                "action_and_text": "قسم 'زيارة افتراضية للصالون' مع خريطة تفاعلية وزر: [الاتصال المباشر بالحجز: 0781 08 80 61]."
            },
            {
                "subfolder": "04_تقييمات_وثقة_الزبائن_Social_Proof",
                "role": "بناء المصداقية وسحق أي تردد لدى الزبونة الجديدة عبر شهادات حقيقية وتقييمات معتمدة.",
                "files_to_copy": [
                    (os.path.join(HIGHLIGHTS_DIR, r"03_Temoignages_شهادات_وآراء_الزبائن\Slide_01.jpg"), "01_شهادة_زبونة_واتساب_1.jpg"),
                    (os.path.join(HIGHLIGHTS_DIR, r"03_Temoignages_شهادات_وآراء_الزبائن\Slide_02.jpg"), "02_شهادة_زبونة_واتساب_2.jpg"),
                    (os.path.join(REELS_ORIG_DIR, "Reel_03_DfFvI-SBXoO.mp4"), "03_فيديو_تفاعل_الزبونات_POV.mp4")
                ],
                "action_and_text": "شريط آراء الزبونات (Google 4.9/5) مع صور المحادثات الحقيقية لتعزيز الثقة بنسبة 100%."
            }
        ]
    },
    "02_صفحة_علاجات_البشرة_Soins_Visage": {
        "title": "صفحة علاجات وعناية البشرة (Skin Treatments)",
        "mission": "استعراض تخصص الصالون الأساسي في الجلد والبشرة، وشرح تقنيات الهيدرافيشل والترددات العالية وسوتيس بالتفصيل.",
        "files_to_copy": [
            (os.path.join(REELS_ORIG_DIR, "Reel_01_DfNgPc3uxAf.mp4"), "01_فيديو_الهيدرافيشل_علاج_الرؤوس_البيضاء.mp4"),
            (os.path.join(REELS_ORIG_DIR, "Reel_06_De2PXedsRKA.mp4"), "02_فيديو_علاج_الحبوب_بالترددات_العالية.mp4"),
            (os.path.join(REELS_ORIG_DIR, "Reel_07_Deuj6P3MxAr.mp4"), "03_فيديو_جلسة_سوتيس_للبشرة_الناضجة.mp4"),
            (os.path.join(REELS_ORIG_DIR, "Reel_04_De-D6CSMoFz.mp4"), "04_فيديو_5_نصائح_ذهبية_للبشرة.mp4"),
            (os.path.join(MAPS_PHOTOS_DIR, "Photo_06.jpg"), "05_صورة_أجهزة_عناية_البشرة_الطبية.jpg"),
            (os.path.join(MAPS_PHOTOS_DIR, "Photo_09.jpg"), "06_صورة_مستحضرات_البشرة_الفاخرة.jpg")
        ],
        "usage_guide": "توضع هذه الفيديوهات والصور بجانب كل بروتوكول علاجي، مع شرح الفوائد الطبية ونوع البشرة المناسب وزر [احجزي استشارتكِ المجانية للبشرة]."
    },
    "03_صفحة_تقشير_القدمين_والبديكير_Callus_Peeling": {
        "title": "صفحة العناية بالقدمين والبديكير (Callus Peeling & Foot Care)",
        "mission": "تسليط الضوء على الخدمة التوقيعية (Signature Service) التي ينفرد بها صالون JOVEN وتحقق أعلى نسب رضا وإعجاب.",
        "files_to_copy": [
            (os.path.join(REELS_ORIG_DIR, "Reel_02_DfHPPF0sd80.mp4"), "01_فيديو_Callus_Peeling_BestSeller.mp4"),
            (os.path.join(REELS_ORIG_DIR, "Reel_14_DZVjdIys26V.mp4"), "02_فيديو_نتائج_الصيف_الخيالية.mp4"),
            (os.path.join(REELS_ORIG_DIR, "Reel_12_DeNPuQnstLh.mp4"), "03_فيديو_جلسة_البديكير_المتقنة_ساعتين.mp4"),
            (os.path.join(HIGHLIGHTS_DIR, r"06_Callus_Peeling_تقشير_القدمين\Slide_02.jpg"), "04_صورة_قبل_وبعد_التقشير_1.jpg"),
            (os.path.join(HIGHLIGHTS_DIR, r"06_Callus_Peeling_تقشير_القدمين\Slide_04.jpg"), "05_صورة_قبل_وبعد_التقشير_2.jpg"),
            (os.path.join(MAPS_PHOTOS_DIR, "Photo_04.jpg"), "06_صورة_كرسي_ومعدات_البديكير_الفاخرة.jpg")
        ],
        "usage_guide": "هذه الصفحة تحول الزائرة إلى عميلة فورية من خلال إظهار نتائج قبل وبعد الفورية، مع زر [تخلصي من تشققات القدمين في جلسة واحدة]."
    },
    "04_صفحة_علاجات_الشعر_والرموش_والأظافر_Beauty_Bar": {
        "title": "صفحة علاجات الشعر والرموش والأظافر (Hair, Lashes & Nails)",
        "mission": "تغطية خدمات التجميل الإضافية المتكاملة لخدمة العرائس والسيدات الراغبات في إطلالة كاملة.",
        "files_to_copy": [
            (os.path.join(HIGHLIGHTS_DIR, r"04_Soins_Cheveux_علاجات_الشعر\Slide_01.jpg"), "01_صورة_علاج_وترميم_الشعر_1.jpg"),
            (os.path.join(HIGHLIGHTS_DIR, r"04_Soins_Cheveux_علاجات_الشعر\Slide_02.jpg"), "02_صورة_ترطيب_ولمعان_الشعر_2.jpg"),
            (os.path.join(HIGHLIGHTS_DIR, r"05_Cils_عناية_ورفع_الرموش\Slide_01.jpg"), "03_صورة_قبل_وبعد_رفع_الرموش_LashLift.jpg"),
            (os.path.join(HIGHLIGHTS_DIR, r"08_Onglerie_العناية_بالأظافر\Slide_01.jpg"), "04_صورة_تصاميم_الأظافر_والجل_1.jpg"),
            (os.path.join(HIGHLIGHTS_DIR, r"08_Onglerie_العناية_بالأظافر\Slide_02.jpg"), "05_صورة_ألوان_الأظافر_الراقية_2.jpg")
        ],
        "usage_guide": "تُعرض كمعرض صور أنيق (Visual Portfolio) مخصص لرفع الرموش الطبيعية، مانيكير وجل الأظافر، وعلاجات بروتين وترميم الشعر."
    },
    "05_صفحة_من_نحن_وفلسفة_الصالون_About_Us": {
        "title": "صفحة من نحن وهوية المعهد (About Joven & Founder Story)",
        "mission": "إبراز الطابع الإنساني الراقي، وقصة رائدة الأعمال صاحبة الصالون، وتأكيد معايير النظافة والخصوصية والهدوء.",
        "files_to_copy": [
            (os.path.join(REELS_ORIG_DIR, "Reel_10_DeUyq_1sFQN.mp4"), "01_فيديو_كواليس_رائدة_الأعمال_الشهير.mp4"),
            (os.path.join(REELS_TRANS_DIR, "Reel_10_DeUyq_1sFQN_الترجمة_والتحليل_بالعربية.txt"), "02_نص_وترجمة_قصة_رائدة_الأعمال.txt"),
            (os.path.join(MAPS_PHOTOS_DIR, "Photo_10.jpg"), "03_صورة_ديكور_وأجواء_الصالون_الهادئة.jpg"),
            (os.path.join(MAPS_PHOTOS_DIR, "Photo_12.jpg"), "04_صورة_الصالون_من_الداخل.jpg"),
            (os.path.join(REELS_ORIG_DIR, "Reel_08_DepQwh1sd0A.mp4"), "05_فيديو_فلسفة_العناية_الصحية_بالجلد.mp4")
        ],
        "usage_guide": "هذه الصفحة تجعل الزبونة تشعر بالألفة والانتماء وأن الصالون ليس مجرد مكان تجاري بل ملاذ أنثوي خاص مبني على الحب والخبرة الحقيقية."
    },
    "06_صفحة_الأسعار_وسياسة_الحجز_Pricing_Booking": {
        "title": "صفحة قوائم الأسعار وسياسة الحجز (Pricing & Booking Policy)",
        "mission": "الشفافية في الأسعار والشروط، وتوجيه الزبونة لحجز موعدها عبر الهاتف أو الواتساب دون تعقيد.",
        "files_to_copy": [
            (os.path.join(HIGHLIGHTS_DIR, r"01_Tarifs_الأسعار_والتسعيرات\Slide_01.jpg"), "01_قائمة_الأسعار_الرسمية_1.jpg"),
            (os.path.join(HIGHLIGHTS_DIR, r"01_Tarifs_الأسعار_والتسعيرات\Slide_02.jpg"), "02_قائمة_الأسعار_الرسمية_2.jpg"),
            (os.path.join(HIGHLIGHTS_DIR, r"02_Conditions_تنبيهات_وشروط_الحجز\Slide_01.jpg"), "03_شروط_الحجز_المسبق_والنظافة_1.jpg"),
            (os.path.join(HIGHLIGHTS_DIR, r"02_Conditions_تنبيهات_وشروط_الحجز\Slide_02.jpg"), "04_شروط_الحجز_المسبق_والنظافة_2.jpg"),
            (os.path.join(REELS_ORIG_DIR, "Reel_15_DZ4_IpfsP1u.mp4"), "05_فيديو_رقم_الهاتف_وطريقة_الحجز_0781088061.mp4")
        ],
        "usage_guide": "عرض الأسعار بوضوح يقلل الأسئلة المكررة، والتأكيد على شرط (Sur RDV uniquement) يحافظ على بريستيج الصالون وفخامته."
    }
}

print("Creating organized directory structure and distributing media...")

for page_folder, p_data in PAGES_CONFIG.items():
    page_path = os.path.join(ORGANIZED_DIR, page_folder)
    os.makedirs(page_path, exist_ok=True)
    
    # Check if page has subsections
    if "subsections" in p_data:
        guide_lines = [
            f"# 📌 {p_data['title']}\n",
            f"**الهدف الاستراتيجي:** {p_data['mission']}\n\n",
            "---\n\n",
            "## 🗂️ توزيع أقسام الصفحة الرئيسية ومحتوياتها:\n\n"
        ]
        
        for sub in p_data["subsections"]:
            sub_path = os.path.join(page_path, sub["subfolder"])
            os.makedirs(sub_path, exist_ok=True)
            guide_lines.append(f"### 📍 {sub['subfolder']}\n")
            guide_lines.append(f"- **دور هذا القسم في الموقع:** {sub['role']}\n")
            guide_lines.append(f"- **النص والدعوة للإجراء (CTA):** {sub['action_and_text']}\n")
            guide_lines.append("- **الملفات المختارة:**\n")
            
            for src, dst_name in sub["files_to_copy"]:
                if src and os.path.exists(src):
                    dst = os.path.join(sub_path, dst_name)
                    shutil.copy2(src, dst)
                    guide_lines.append(f"  • `{dst_name}`\n")
            guide_lines.append("\n---\n\n")
            
        with open(os.path.join(page_path, "دليل_محتويات_الصفحة_الرئيسية.md"), "w", encoding="utf-8") as f_g:
            f_g.writelines(guide_lines)
            
    else:
        # Standard page
        guide_lines = [
            f"# 📌 {p_data['title']}\n",
            f"**الهدف الاستراتيجي:** {p_data['mission']}\n\n",
            "**إرشادات الاستخدام والتطبيق:**\n",
            f"{p_data['usage_guide']}\n\n",
            "---\n\n",
            "## 📁 الملفات المختارة لهذه الصفحة ودور كل ملف:\n\n"
        ]
        
        for src, dst_name in p_data["files_to_copy"]:
            if src and os.path.exists(src):
                dst = os.path.join(page_path, dst_name)
                shutil.copy2(src, dst)
                guide_lines.append(f"- **`{dst_name}`**: تم اختياره بعناية لخدمة محتوى هذه الصفحة.\n")
                
        with open(os.path.join(page_path, "دليل_استخدام_ملفات_هذه_الصفحة.md"), "w", encoding="utf-8") as f_g:
            f_g.writelines(guide_lines)

# Master Strategy Guide in the root of 05_تنظيم_الموقع_حسب_الصفحات
master_strategy = """# 🎯 الخطة الاستراتيجية لتوزيع المحتوى والوسائط على صفحات الموقع

تم بناء هذه الخطة وفق مبادئ **التسويق العصبي وتجربة المستخدم الفاخرة (Luxury Beauty Salon UX/UI)**.
الصالون يقع في أرقى أحياء الجزائر العاصمة (**حيدرة - Hydra**)، وجمهوره المستهدف يبحث عن **الجودة، النظافة، النتائج المضمونة، والخصوصية التامة**.

لذلك، ليس الهدف حشو الموقع بكل صورة أو فيديو تم تحميله، بل **انتقاء أفضل العناصر ذات التأثير البصري والإقناعي الأقوى** وتوزيعها كالتالي:

---

## 🌟 1. الصفحة الرئيسية (The Homepage): "الواجهة الساحرة والإقناع السريع"
- **واجهة الهيرو (Hero):** فيديو ترحيبي قصير هادئ لمعهد JOVEN وصورة للديكور الداخلي الأنيق لمنح شعور فوري بالراحة والسكينة.
- **قسم الـ Best Sellers (الأكثر مبيعاً):** وضع الفيديوهات الـ 3 الأكثر نجاحاً وتفاعلاً:
  1. فيديو **Callus Peeling** (الفيديو الفيروسي الحاصل على أكثر من 1,000 إعجاب).
  2. فيديو **الهيدرافيشل** (لتنظيف ونضارة البشرة).
  3. فيديو **جلسة سوتيس** (الخدمة الفاخرة المحددة بسعر 15,000 دج).
- **الجولة الافتراضية 360°:** تضمين فيديو الدوران 360 درجة لمحيط الصالون والشارع الهادئ لإثبات وجود الصالون على أرض الواقع وسهولة الوصول إليه.
- **شريط الثقة (Social Proof):** تقييم 4.9 نجوم على Google Maps مع صور محادثات واتساب حقيقية لزبونات يشكرن الصالون.

---

## 💆‍♀️ 2. صفحة علاجات البشرة (Soins Visage): "الخبرة والتقنية"
- **المحتوى المختار:** فيديوهات الهيدرافيشل للرؤوس البيضاء، جهاز الترددات العالية (Haute Fréquence) لحب الشباب، وجلسة Sothys.
- **الهدف:** إبراز الجانب الطبي والتجميلي التخصصي، وتشجيع الزبونة على حجز استشارة وفحص للبشرة.

---

## 🦶 3. صفحة تقشير القدمين والبديكير (Callus Peeling & Pédicure): "السحر الفوري"
- **المحتوى المختار:** فيديوهات وصور قبل وبعد الحقيقية لجلسة Callus Peeling، مع فيديو جلسة البديكير المتقنة التي تدوم ساعتين كاملتين.
- **الهدف:** هذه الخدمة هي العلامة الفارقة للصالون (Signature Service)؛ رؤية النعومة الفورية في الصور تدفع الزبونة لاتخاذ قرار الحجز فوراً بدون تردد.

---

## 💅 4. صفحة الشعر والرموش والأظافر (Beauty Bar): "الإطلالة المتكاملة"
- **المحتوى المختار:** صور قبل وبعد لرفع الرموش الطبيعية (Lash Lift)، صور ألوان وجل الأظافر، وصور جلسات ترميم الشعر.
- **الهدف:** خدمة العرائس والسيدات اللاتي يبحثن عن باقة تجميل متكاملة في مكان واحد.

---

## 🤍 5. صفحة من نحن وكواليس الصالون (About Us): "الرابط العاطفي والولاء"
- **المحتوى المختار:** فيديو رائدة الأعمال العفوي الشهير (+937 إعجاب)، صور الديكور الهادئ، وفيديو فلسفة العناية الصحية.
- **الهدف:** إبراز الشغف وراء المشروع، وتوضيح أن الصالون يديره كادر نسائي محترف يقدم رعاية شخصية لكل سيدة.

---

## 🏷️ 6. صفحة الأسعار وحجز المواعيد (Pricing & Booking): "الشفافية والتنظيم"
- **المحتوى المختار:** بطاقات الأسعار الرسمية المستخرجة من الهايلاتات، وشروط الحجز المسبق الصارمة (Sur RDV).
- **الهدف:** الشفافية والراحة للزبونة، وتسهيل الحجز المباشر بزر واتساب أو اتصال سريع بالرقم: `0781088061`.
"""

with open(os.path.join(ORGANIZED_DIR, "خطة_توزيع_المحتوى_الاستراتيجي_للموقع.md"), "w", encoding="utf-8") as f_master:
    f_master.write(master_strategy)

print("All pages folders and files distributed and documented successfully!")
