const fs = require('fs');
const path = require('path');

const srcBase = 'C:\\Users\\amir\\OneDrive\\Desktop\\صالون';
const destBase = path.resolve('public/media/authentic');

if (!fs.existsSync(destBase)) {
  fs.mkdirSync(destBase, { recursive: true });
}

const copyList = [
  // Interior & Facade
  {
    src: path.join(srcBase, '05_تنظيم_الموقع_حسب_الصفحات', '01_الصفحة_الرئيسية_Homepage', '01_قسم_الهيرو_والواجهة_Hero', '01_صورة_الصالون_الرئيسية_Hero_Interior.jpg'),
    dest: 'hero_interior.jpg'
  },
  {
    src: path.join(srcBase, '05_تنظيم_الموقع_حسب_الصفحات', '01_الصفحة_الرئيسية_Homepage', '01_قسم_الهيرو_والواجهة_Hero', '03_صورة_المدخل_الخارجي_Facade.jpg'),
    dest: 'facade.jpg'
  },
  // Skin & Sothys Equipment
  {
    src: path.join(srcBase, '05_تنظيم_الموقع_حسب_الصفحات', '02_صفحة_علاجات_البشرة_Soins_Visage', '05_صورة_أجهزة_عناية_البشرة_الطبية.jpg'),
    dest: 'skin_devices.jpg'
  },
  {
    src: path.join(srcBase, '05_تنظيم_الموقع_حسب_الصفحات', '02_صفحة_علاجات_البشرة_Soins_Visage', '06_صورة_مستحضرات_البشرة_الفاخرة.jpg'),
    dest: 'skin_products.jpg'
  },
  // Pedicure & Callus Peeling
  {
    src: path.join(srcBase, '05_تنظيم_الموقع_حسب_الصفحات', '03_صفحة_تقشير_القدمين_والبديكير_Callus_Peeling', '06_صورة_كرسي_ومعدات_البديكير_الفاخرة.jpg'),
    dest: 'pedicure_chair.jpg'
  },
  // Beauty Bar: Lashes & Nails
  {
    src: path.join(srcBase, '05_تنظيم_الموقع_حسب_الصفحات', '04_صفحة_علاجات_الشعر_والرموش_والأظافر_Beauty_Bar', '03_صورة_قبل_وبعد_رفع_الرموش_LashLift.jpg'),
    dest: 'lash_lift_before_after.jpg'
  },
  {
    src: path.join(srcBase, '05_تنظيم_الموقع_حسب_الصفحات', '04_صفحة_علاجات_الشعر_والرموش_والأظافر_Beauty_Bar', '05_صورة_ألوان_الأظافر_الراقية_2.jpg'),
    dest: 'nails_colors.jpg'
  },
  // Testimonials
  {
    src: path.join(srcBase, '05_تنظيم_الموقع_حسب_الصفحات', '01_الصفحة_الرئيسية_Homepage', '04_تقييمات_وثقة_الزبائن_Social_Proof', '01_شهادة_زبونة_واتساب_1.jpg'),
    dest: 'testimonial_wa_1.jpg'
  },
  {
    src: path.join(srcBase, '05_تنظيم_الموقع_حسب_الصفحات', '01_الصفحة_الرئيسية_Homepage', '04_تقييمات_وثقة_الزبائن_Social_Proof', '02_شهادة_زبونة_واتساب_2.jpg'),
    dest: 'testimonial_wa_2.jpg'
  },
  // Google Maps Photos
  {
    src: path.join(srcBase, '02_Google_Maps', '01_الصور_العامة_Photos', 'Photo_02.jpg'),
    dest: 'salon_interior_2.jpg'
  },
  {
    src: path.join(srcBase, '02_Google_Maps', '01_الصور_العامة_Photos', 'Photo_10.jpg'),
    dest: 'salon_interior_3.jpg'
  },
  {
    src: path.join(srcBase, '02_Google_Maps', '01_الصور_العامة_Photos', 'Photo_14.jpg'),
    dest: 'salon_interior_4.jpg'
  },
  // Videos (Lightweight, engaging clips)
  {
    src: path.join(srcBase, '05_تنظيم_الموقع_حسب_الصفحات', '01_الصفحة_الرئيسية_Homepage', '01_قسم_الهيرو_والواجهة_Hero', '02_فيديو_ترحيب_بالمعهد_Welcome_Joven.mp4'),
    dest: 'video_welcome.mp4'
  },
  {
    src: path.join(srcBase, '05_تنظيم_الموقع_حسب_الصفحات', '03_صفحة_تقشير_القدمين_والبديكير_Callus_Peeling', '01_فيديو_Callus_Peeling_BestSeller.mp4'),
    dest: 'video_callus_bestseller.mp4'
  },
  {
    src: path.join(srcBase, '05_تنظيم_الموقع_حسب_الصفحات', '02_صفحة_علاجات_البشرة_Soins_Visage', '02_فيديو_علاج_الحبوب_بالترددات_العالية.mp4'),
    dest: 'video_haute_frequence.mp4'
  }
];

let copied = 0;
for (const item of copyList) {
  if (fs.existsSync(item.src)) {
    const target = path.join(destBase, item.dest);
    fs.copyFileSync(item.src, target);
    console.log(`Copied: ${item.dest} (${(fs.statSync(target).size / 1024).toFixed(1)} KB)`);
    copied++;
  } else {
    console.warn(`File not found: ${item.src}`);
  }
}

console.log(`\nTotal copied files: ${copied}/${copyList.length}`);
