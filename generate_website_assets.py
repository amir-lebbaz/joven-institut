import os
import json

WEB_ASSETS_DIR = r"C:\Users\amir\Desktop\صالون\03_Website_Assets_ملفات_الموقع"
os.makedirs(WEB_ASSETS_DIR, exist_ok=True)

# 1. Complete Website Architecture Blueprint
blueprint_content = """# 🎨 المخطط المعماري والهندسي لموقع صالون JOVEN Institut

تم إعداد هذا المخطط لبناء موقع إلكتروني فاخر وعصري (High-End Beauty Salon Website) يتطابق مع مستوى خدمات الصالون الراقية في حيدرة (Hydra).

---

## 💎 1. الهوية البصرية ونظام الألوان (Brand Identity & Colors)
- **اللون الأساسي الفاخر:** Rose Gold / Soft Blush Pink (`#E8A598` / `#F472B6`)
- **لون الفخامة والتباين:** Deep Slate / Midnight Navy (`#0F172A` / `#1E293B`)
- **لون النقاء والصفاء:** Clean White & Warm Pearl (`#FFFFFF` / `#F8FAFC`)
- **لون التمييز (Accents):** Champagne Gold (`#D4AF37`)
- **الخطوط الطباعية:**
  - للعربية: **Tajawal** أو **Cairo** (عصري، واضح، مريح للعين)
  - للفرنسية / اللاتينية: **Playfair Display** (للعناوين الفاخرة) + **Inter** (للنصوص)

---

## 🏛️ 2. أقسام الموقع الإلكتروني المقترحة (Page Sections)

### 1. رأس الصفحة (Hero Section):
- عنوان عريض جذاب: *"إشراقة بشرتكِ وفخامة جمالكِ تبدأ هنا — JOVEN Institut"*
- شريط معلومات سريع: 📍 حيدرة (Hydra) | ⭐ تقييم 4.9/5 على Google Maps | 🔒 حجز مسبق VIP
- أزرار الدعوة للإجراء (CTA): [احجزي موعدكِ الآن] و [شاهدي خدماتنا]
- خلفية ديناميكية: فيديو دوران 360 درجة لمحيط الصالون أو فيديو ريلز لعلاجات البشرة.

### 2. شريط الثقة والمصداقية (Social Proof & Trust Badges):
- 🥇 5 سنوات من الخبرة المتخصصة في البشرة والجلد والشعر.
- ✨ أكثر من 200 زبونة وثّقن تجاربهن بتقييم 4.9/5 على Google Maps.
- 🌿 منتجات وماركات عالمية أصلية ومعتمدة (Sothys Paris, HydraFacial MD).
- 🔒 خصوصية تامة واستقبال فردي (Sur Rendez-Vous).

### 3. باقة الخدمات والتسعيرات (Our Signature Services):
- كروت تفاعلية أنيقة مصنفة في تبويبات (Tabs):
  1. **العناية بالبشرة (Soin Visage):**
     - HydraFacial Deep Clean (تنظيف عميق، تغذية، نضارة فورية).
     - Soin Sothys Peaux Matures (توحيد لون، استعادة حيوية البشرة الناضجة - 15,000 دج).
     - Haute Fréquence (تطهير المسام وعلاج الحبوب والبكتيريا).
  2. **العناية بالقدمين واليدين (Pédicure & Callus Peeling):**
     - Callus Peeling Signature (إزالة التصلبات والجلد الميت بالكامل في جلسة واحدة).
     - Pédicure Spa (جلسة عناية فائقة لمدة ساعتين من الاسترخاء).
     - Onglerie (جل، تنظيف، طلاء أظافر راقي).
  3. **علاجات الشعر والرموش (Hair & Lash Treatments):**
     - Soins Cheveux Réparateurs (ترميم مكثف للشعر المتضرر).
     - Rehaussement de Cils (رفع الرموش الطبيعية وإبراز جاذبية العين).

### 4. تجارب وقصص النجاح (Before / After & Client Reviews):
- معرض تفاعلي يبرز النتائج الحقيقية (بشرة نضرة، أقدام ناعمة كالحرير).
- اقتباسات حقيقية من مراجعات Google Maps موثقة بأسماء الزبونات.

### 5. الجولة الافتراضية 360 درجة وموقع الصالون (Virtual Tour & Location):
- عرض تفاعلي لمحيط الصالون والشارع الهادئ الراقي في حيدرة.
- خريطة Google Maps مدمجة مع زر التوجيه بـ GPS.

### 6. نافذة الحجز الذكي (Smart Booking Drawer / Modal):
- اختيار الخدمة المطلوبة والتاريخ والوقت المناسب.
- تحويل مباشر ومنسق إلى واتساب أو اتصال فوري برقم الصالون: `0781088061`.
"""

with open(os.path.join(WEB_ASSETS_DIR, "مخطط_بناء_الموقع_Architecture_Plan.md"), "w", encoding="utf-8") as f_bp:
    f_bp.write(blueprint_content)

print("Website Architecture Blueprint generated successfully!")
