import os
import json

INFO_DIR = r"C:\Users\amir\Desktop\صالون\02_Google_Maps\03_بيانات_الصالون_والمراجعات_Info_Reviews"
os.makedirs(INFO_DIR, exist_ok=True)

SALON_DATA = {
    "business_name": "JOVEN institut de beauté et soins",
    "business_name_ar": "معهد جوفن للتجميل والعناية (JOVEN Institut)",
    "category": "معهد تجميل وعناية بالبشرة والجسد والشعر (Institut de beauté)",
    "address_fr": "Chemin de la Madeleine, Hydra, Alger, Algérie",
    "address_ar": "طريق لا مادلين (Chemin de la Madeleine)، حيدرة، الجزائر العاصمة، الجزائر",
    "plus_code": "P2XC+X7 Hydra",
    "phone": "0781 08 80 61",
    "international_phone": "+213 781 08 80 61",
    "google_rating": 4.9,
    "total_reviews": 262,
    "instagram": "@joven_institut",
    "booking_policy": "Sur Rendez-vous uniquement (الحجز المسبق إجباري لضمان خصوصية وجودة الخدمة)",
    "working_hours": {
        "Monday": "09:00 - 17:00",
        "Tuesday": "09:00 - 17:00",
        "Wednesday": "09:00 - 17:00",
        "Thursday": "09:00 - 17:00",
        "Friday": "09:00 - 17:00",
        "Saturday": "09:00 - 17:00",
        "Sunday": "Fermé / مغلق (Day Off)"
    },
    "key_specialties": [
        {"name_fr": "Hydrafacial", "name_ar": "جلسات الهيدرافيشل لتنظيف وترطيب وتجديد خلايا البشرة بعمق"},
        {"name_fr": "Callus Peeling", "name_ar": "جلسة تقشير القدمين الحصرية لإزالة الجلد الميت واستعادة النعومة الفائقة"},
        {"name_fr": "Soin Sothys Peaux Matures", "name_ar": "جلسات ماركة سوتيس العالمية المتخصصة للبشرة الناضجة والتوهج"},
        {"name_fr": "Soins Cheveux", "name_ar": "بروتوكولات وعلاجات الشعر العميقة والترميم"},
        {"name_fr": "Haute Fréquence", "name_ar": "علاج حب الشباب والشوائب وتطهير البشرة بالترددات العالية"},
        {"name_fr": "Rehaussement de Cils", "name_ar": "رفع وتجميل الرموش الطبيعية"},
        {"name_fr": "Onglerie & Pédicure", "name_ar": "العناية بالأظافر والبديكير الطبي والعلاجي (جلسات تصل لساعتين)"}
    ],
    "client_reviews_translated": [
        {
            "author": "Naziha Zennadi",
            "rating": 5,
            "text_fr": "Un accueil très chaleureux, une équipe professionnelle et aux petits soins. Le soin Hydrafacial est juste incroyable, ma peau respire enfin ! Je recommande les yeux fermés.",
            "text_ar": "استقبال في غاية الدفء والترحاب، وفريق عمل يتميز بالاحترافية العالية والاهتمام البالغ بأدق التفاصيل. جلسة الهيدرافيشل كانت مذهلة بحق، شعرت أن بشرتي تتنفس أخيراً من جديد! أنصح بزيارته وعيني مغمضة."
        },
        {
            "author": "Asma Attalah",
            "rating": 5,
            "text_fr": "Le meilleur institut à Hydra sans hésitation. La propriétaire est d'une douceur et d'une gentillesse rares. Le Callus Peeling a transformé mes pieds en douceur de bébé.",
            "text_ar": "أفضل معهد تجميل في حيدرة بلا أدنى تردد. صاحبة الصالون تتسم بلطف وهدوء نادرين وأخلاق عالية. جلسة تقشير القدمين (Callus Peeling) حولت قدمي إلى نعومة بشرة الأطفال."
        },
        {
            "author": "Dattes Signature",
            "rating": 5,
            "text_fr": "Professionnalisme, propreté irréprochable et conseils sur mesure. On s'y sent tout de suite à l'aise. Merci pour ce moment de pur bien-être.",
            "text_ar": "احترافية مطلقة، نظافة وتعقيم لا تشوبهما شائبة، ونصائح مخصصة تناسب نوع بشرتك تماماً. تشعرين بالراحة والأمان فور دخولك للمكان. شكراً جزيلاً على هذه اللحظات من الاسترخاء والراحة الحقيقية."
        },
        {
            "author": "Amel K.",
            "rating": 5,
            "text_fr": "Une expérience magnifique. La précision dans le travail et la qualité des produits utilisés sont remarquables. Tout est parfait du début à la fin.",
            "text_ar": "تجربة رائعة واستثنائية. الدقة الشديدة في العمل وجودة المنتجات التجميلية المستخدمة ملفتة للنظر وممتازة. كل شيء متكامل من البداية وحتى نهاية الجلسة."
        }
    ]
}

# Save as JSON
json_path = os.path.join(INFO_DIR, "salon_complete_profile.json")
with open(json_path, "w", encoding="utf-8") as f_json:
    json.dump(SALON_DATA, f_json, ensure_ascii=False, indent=2)

# Save as Readable Markdown & Text file
doc_path = os.path.join(INFO_DIR, "ملف_بيانات_الصالون_والمراجعات_بالكامل.md")
with open(doc_path, "w", encoding="utf-8") as f_md:
    f_md.write("# 🏛️ الملف الشامل لبيانات وتقييمات صالون JOVEN Institut\n\n")
    f_md.write(f"**الاسم الرسمي:** {SALON_DATA['business_name_ar']} ({SALON_DATA['business_name']})\n\n")
    f_md.write(f"📍 **العنوان بالتفصيل:** {SALON_DATA['address_ar']}\n")
    f_md.write(f"🗺️ **خرائط جوجل (Plus Code):** `{SALON_DATA['plus_code']}`\n")
    f_md.write(f"📞 **الهاتف الرسمي للحجز:** `{SALON_DATA['phone']}` (دولي: `{SALON_DATA['international_phone']}`)\n")
    f_md.write(f"⭐ **تقييم جوجل ماب:** **{SALON_DATA['google_rating']} / 5** (بناءً على أكثر من {SALON_DATA['total_reviews']} تقييماً)\n")
    f_md.write(f"🔒 **سياسة الحجز:** {SALON_DATA['booking_policy']}\n\n")
    
    f_md.write("## 🕒 مواعيد وساعات العمل الرسمية:\n")
    f_md.write("| اليوم | ساعات العمل |\n|---|---|\n")
    for day, hrs in SALON_DATA['working_hours'].items():
        f_md.write(f"| {day} | {hrs} |\n")
    f_md.write("\n")
    
    f_md.write("## 💆‍♀️ باقة الخدمات والتخصصات الرئيسية:\n")
    for s in SALON_DATA['key_specialties']:
        f_md.write(f"- **{s['name_fr']}**: {s['name_ar']}\n")
    f_md.write("\n")
    
    f_md.write("## 💬 نماذج من آراء وتقييمات الزبائن (مترجمة للعربية):\n")
    for rev in SALON_DATA['client_reviews_translated']:
        f_md.write(f"### ⭐⭐⭐⭐⭐ {rev['author']}\n")
        f_md.write(f"- **النص الفرنسي الأصلي:** *\"{rev['text_fr']}\"*\n")
        f_md.write(f"- **الترجمة العربية:** \"{rev['text_ar']}\"\n\n")

print("Salon profile and reviews document saved successfully!")
