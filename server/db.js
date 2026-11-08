const fs = require('fs');
const path = require('path');

let DatabaseSync;
try {
  ({ DatabaseSync } = require('node:sqlite'));
} catch (e) {
  try {
    DatabaseSync = require('better-sqlite3');
  } catch (err) {
    console.error('Neither node:sqlite nor better-sqlite3 could be loaded', err);
    throw err;
  }
}

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'joven.db');
const db = new DatabaseSync(dbPath);

// Enable WAL mode for high performance
try {
  db.exec('PRAGMA journal_mode = WAL;');
} catch (e) {
  // Ignore if not supported in in-memory or specific engine mode
}

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    duration TEXT NOT NULL,
    price INTEGER NOT NULL,
    old_price INTEGER,
    is_promo INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    video_url TEXT NOT NULL,
    poster_url TEXT,
    instagram_permalink TEXT,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS highlights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    cover_url TEXT NOT NULL,
    stories_count INTEGER DEFAULT 5,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS instagram_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT NOT NULL,
    likes_count INTEGER DEFAULT 240,
    date_posted TEXT NOT NULL,
    permalink TEXT
  );
`);

// Check and seed initial data if empty
function seedDatabase() {
  const serviceCount = db.prepare('SELECT COUNT(*) as count FROM services').get().count;
  if (Number(serviceCount) === 0) {
    console.log('Seeding initial 15 services into joven.db...');
    const insertService = db.prepare(`
      INSERT INTO services (title, category, description, duration, price, old_price, is_promo, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const initialServices = [
      [
        'Soin Hydrafacial Prestige',
        'العناية بالبشرة',
        'تنظيف عميق للبشرة بـ 6 مراحل: تقشير لطيف، شفط الرؤوس السوداء والشوائب، ضخ سيروم مضادات الأكسدة وحمض الهيالورونيك مع جلسة LED.',
        '90 دقيقة',
        8500,
        10000,
        1,
        1
      ],
      [
        'Hydra-Glow Express',
        'العناية بالبشرة',
        'تنظيف وترطيب مكثف لإعادة الإشراقة الفورية للبشرة المجهدة قبل المناسبات.',
        '60 دقيقة',
        6000,
        7000,
        0,
        2
      ],
      [
        'Microneedling + Sérum Vitamine C',
        'العناية بالبشرة',
        'تحفيز الكولاجين الطبيعي وعلاج المسامات الواسعة وآثار الحبوب وتوحيد لون البشرة.',
        '60 دقيقة',
        6000,
        7500,
        0,
        3
      ],
      [
        'Forfait Duo : Hydrafacial + Microneedling',
        'العناية بالبشرة',
        'الباقة الأكثر طلباً لتجديد البشرة بالكامل: تنظيف عميق متبوع بجلسة ديرمابن مغذية.',
        '90 دقيقة',
        14000,
        16000,
        1,
        4
      ],
      [
        'Peeling Lumilight / Anti-Taches',
        'العناية بالبشرة',
        'جلسة تقشير آمن لعلاج الكلف، البقع الداكنة، وتفتيح لون البشرة وتجديد الخلايا.',
        '60 دقيقة',
        9000,
        10500,
        0,
        5
      ],
      [
        'Soin Visage Classique & Extraction',
        'العناية بالبشرة',
        'تنظيف كلاسيكي بالبخار، إزالة الشوائب، ماسك مهدئ ومساج للوجه والرقبة.',
        '60 دقيقة',
        4000,
        5000,
        0,
        6
      ],
      [
        'Japanese Head Spa Ritual',
        'الشعر والسبا',
        'ديتوكس وتنظيف عميق لفروة الرأس، بخار الأوزون، حمام زيتي علاجي مع مساج استرخائي للرأس والرقبة والكتفين.',
        '75 دقيقة',
        7000,
        8500,
        1,
        7
      ],
      [
        'Lissage Brésilien / Protéine Pure',
        'الشعر والسبا',
        'فرد وعلاج الشعر التالف والمتقصف بمنتجات برازيلية أصلية خالية من الفورمول تمنح نعومة ولمعة كالحرير.',
        '180 دقيقة',
        12000,
        15000,
        0,
        8
      ],
      [
        'Soin Botox Capillaire Réparateur',
        'الشعر والسبا',
        'جلسة ترميم مكثفة للشعر المصبوغ والجاف لإعادة الحيوية والكثافة بدون إضعاف الشعرة.',
        '90 دقيقة',
        5500,
        7000,
        0,
        9
      ],
      [
        'Coloration Sans Ammoniaque + Brushing',
        'الشعر والسبا',
        'صبغة احترافية تحافظ على صحة الشعر مع قص الأطراف وتصفيف كامل.',
        '120 دقيقة',
        6500,
        8000,
        0,
        10
      ],
      [
        'Manucure Russe + Pose Gel BIAB',
        'الأظافر والتجميل',
        'تنظيف دقيق للجلد المحيط بالأظافر على الطريقة الروسية مع طبقة تقوية BIAB تدوم أكثر من 3 أسابيع.',
        '75 دقيقة',
        4500,
        5500,
        1,
        11
      ],
      [
        'Pédicure Médicale & Spa des Pieds',
        'الأظافر والتجميل',
        'عناية متكاملة بالقدمين، إزالة الجلد الميت، تقشير بالأملاح، ماسك ترطيب عميق وطلاء أظافر.',
        '60 دقيقة',
        4000,
        5000,
        0,
        12
      ],
      [
        'Pack Mains & Pieds (Vernis Permanent)',
        'الأظافر والتجميل',
        'باقة العناية الكاملة باليدين والقدمين مع طلاء دائم بألوان موسمية أنيقة.',
        '110 دقيقة',
        6000,
        7500,
        1,
        13
      ],
      [
        'Brow Lift + Rehaussement de Cils',
        'الرموش والحواجب',
        'رفع وترتيب الحواجب والرموش الطبيعية مع التغذية بالكيراتين والبوتوكس والصبغة.',
        '60 دقيقة',
        6000,
        7500,
        1,
        14
      ],
      [
        'Pack Reine (Spécial Mariée VIP)',
        'باقات العرائس',
        'باقة العروس المتكاملة: Soin Hydrafacial + جلسة Head Spa + Manucure BIAB & Pédicure Spa + إزالة شعر كاملة + Brow Lift.',
        'يوم كامل',
        25000,
        32000,
        1,
        15
      ]
    ];

    db.exec('BEGIN TRANSACTION;');
    try {
      for (const s of initialServices) {
        insertService.run(...s);
      }
      db.exec('COMMIT;');
    } catch (err) {
      db.exec('ROLLBACK;');
      throw err;
    }
  }

  // Seed settings if empty
  const settingsCount = db.prepare('SELECT COUNT(*) as count FROM settings').get().count;
  if (Number(settingsCount) === 0) {
    console.log('Seeding initial settings...');
    const insertSetting = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
    const initialSettings = [
      ['whatsapp_number', '213781088061'],
      ['address', 'Chemin de la Madeleine, 27, Hydra, Alger'],
      ['rating', '4.8'],
      ['reviews_count', '264'],
      ['admin_pin', '1234']
    ];
    db.exec('BEGIN TRANSACTION;');
    try {
      for (const [k, v] of initialSettings) {
        insertSetting.run(k, v);
      }
      db.exec('COMMIT;');
    } catch (err) {
      db.exec('ROLLBACK;');
      throw err;
    }
  }

  // Seed gallery if empty
  const galleryCount = db.prepare('SELECT COUNT(*) as count FROM gallery').get().count;
  if (Number(galleryCount) === 0) {
    console.log('Seeding initial 6 gallery cards...');
    const insertGallery = db.prepare(`
      INSERT INTO gallery (title, subtitle, category, image_url)
      VALUES (?, ?, ?, ?)
    `);

    const initialGallery = [
      [
        'Hydrafacial Glow Clinic',
        'تنظيف عميق وإشراقة طبيعية فورية للبشرة',
        'العناية بالبشرة',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
      ],
      [
        'Japanese Head Spa Ritual',
        'جلسة استرخاء استثنائية وديتوكس لفروة الرأس',
        'الشعر والسبا',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
      ],
      [
        'Manucure Russe & Gel BIAB',
        'دقة روسية واحترافية فائقة للأظافر مع حماية بياب',
        'الأظافر والتجميل',
        'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80'
      ],
      [
        'Microneedling & Serum Boost',
        'تحفيز الكولاجين وتجديد ملمس ونضارة البشرة',
        'العناية بالبشرة',
        'https://images.unsplash.com/photo-1512290900672-1f40b2a8d13e?auto=format&fit=crop&w=800&q=80'
      ],
      [
        'Bridal VIP Suite Experience',
        'جناح خاص ومراسم ملكية مخصصة للعروس',
        'باقات العرائس',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
      ],
      [
        'Pédicure Médicale & Spa',
        'عناية فاخرة وتقشير علاجي بأقصى معايير التعقيم',
        'الأظافر والتجميل',
        'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=800&q=80'
      ]
    ];

    db.exec('BEGIN TRANSACTION;');
    try {
      for (const g of initialGallery) {
        insertGallery.run(...g);
      }
      db.exec('COMMIT;');
    } catch (err) {
      db.exec('ROLLBACK;');
      throw err;
    }
  }

  // Seed faqs if empty
  const faqsCount = db.prepare('SELECT COUNT(*) as count FROM faqs').get().count;
  if (Number(faqsCount) === 0) {
    console.log('Seeding FAQs...');
    const insertFaq = db.prepare('INSERT INTO faqs (question, answer) VALUES (?, ?)');
    const initialFaqs = [
      [
        'هل يتطلب الحجز المسبق قبل زيارة المعهد في حيدرة؟',
        'نعم، لضمان أعلى مستويات الخصوصية والراحة وتخصيص الوقت الكافي لكل عميلة، يتم الحجز مسبقاً عبر الواتساب أو الهاتف قبل الحضور.'
      ],
      [
        'ما هي أوقات العمل الرسمية لمعهد JOVEN؟',
        'نستقبلكم في مقرنا بحيدرة (Chemin de la Madeleine, 27): السبت، الإثنين، الثلاثاء، والخميس من 09:00 إلى 17:00 | الأحد من 09:00 إلى 19:00 | الأربعاء من 09:00 إلى 12:00 | والجمعة عطلة أسبوعية.'
      ],
      [
        'هل المعهد مخصص للنساء فقط بنسبة 100%؟',
        'نعم، معهد JOVEN نسائي مغلق ومحمي تماماً، حيث يعمل طاقم متخصص من خبيرات التجميل والسبا في أجواء تراعي أقصى درجات الراحة والسرية التامة.'
      ],
      [
        'كيف يمكنني الاستفادة من باقات العروض والتخفيضات؟',
        'يمكنك تصفح قسم "العروض الخاصة" واختيار الخدمة المناسبة والضغط على زر الحجز عبر الواتساب ليتم تثبيت السعر المخفض فوراً مع مسؤولة الاستقبال.'
      ]
    ];

    db.exec('BEGIN TRANSACTION;');
    try {
      for (const f of initialFaqs) {
        insertFaq.run(...f);
      }
      db.exec('COMMIT;');
    } catch (err) {
      db.exec('ROLLBACK;');
      throw err;
    }
  }

  // Update brand settings with local media & official Instagram handle
  const updateSetting = db.prepare(`
    INSERT INTO settings (key, value)
    VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);
  updateSetting.run('logo_url', '/media/brand/joven-logo.webp');
  updateSetting.run('hero_image_url', '/media/brand/joven-hero.webp');
  updateSetting.run('instagram_handle', '@joven_institut');
  updateSetting.run('instagram_url', 'https://www.instagram.com/joven_institut/');

  // Update gallery images to verified local paths from @joven_institut
  const localGalleryItems = [
    [1, 'Soin Hydrafacial Prestige & Extraction', 'جلسة تنظيف عميق 6 مراحل مع ترطيب مكثف بالهيالورونيك', 'العناية بالبشرة', '/media/posts/post-1.webp'],
    [2, 'Rituel Japanese Head Spa & Détente', 'ديتوكس عميق ومساج استرخائي لفروة الرأس بأبخرة الأوزون', 'الشعر والسبا', '/media/posts/post-2.webp'],
    [3, 'Manucure Russe & Renforcement Gel BIAB', 'دقة روسية واحترافية فائقة للأظافر مع حماية بياب تدوم 3+ أسابيع', 'الأظافر والتجميل', '/media/posts/post-3.webp'],
    [4, 'Microneedling & Sérum Collagène Boost', 'تحفيز الكولاجين وتجديد ملمس ونضارة البشرة مع تقليص المسام', 'العناية بالبشرة', '/media/posts/post-4.webp'],
    [5, 'Pack Mariée Royale VIP Experience', 'مراسم ملكية مخصصة للعروس في جناح خاص ومستقل', 'باقات العرائس', '/media/posts/post-5.webp'],
    [6, 'Pédicure Médicale & Spa des Pieds', 'عناية فائقة وتقشير علاجي بأعلى معايير التعقيم الطبي', 'الأظافر والتجميل', '/media/posts/post-6.webp']
  ];

  for (const [id, title, subtitle, category, imgUrl] of localGalleryItems) {
    db.prepare(`
      UPDATE gallery SET title = ?, subtitle = ?, category = ?, image_url = ? WHERE id = ?
    `).run(title, subtitle, category, imgUrl, id);
  }

  // Seed reels if empty
  const reelsCount = db.prepare('SELECT COUNT(*) as count FROM reels').get().count;
  if (Number(reelsCount) === 0) {
    console.log('Seeding initial 4 video reels into joven.db...');
    const insertReel = db.prepare(`
      INSERT INTO reels (title, category, video_url, poster_url, instagram_permalink, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const initialReels = [
      [
        'Soin Hydrafacial Prestige • مراحل التنظيف والشفط وجلسة LED',
        'العناية بالبشرة',
        '/media/reels/reel-1.mp4',
        '/media/reels/reel-1-poster.webp',
        'https://www.instagram.com/joven_institut/reel/DZVjdIys26V/',
        1
      ],
      [
        'Rituel Japanese Head Spa • استرخاء عميق بمساج الماء وبخار الأوزون',
        'الشعر والسبا',
        '/media/reels/reel-2.mp4',
        '/media/reels/reel-2-poster.webp',
        'https://www.instagram.com/joven_institut/reel/Db3zyIIMhV0/',
        2
      ],
      [
        'Manucure Russe & Gel BIAB • الدقة والاحترافية الروسية للأظافر',
        'الأظافر والتجميل',
        '/media/reels/reel-3.mp4',
        '/media/reels/reel-3-poster.webp',
        'https://www.instagram.com/joven_institut/reel/DZ4_IpfsP1u/',
        3
      ],
      [
        'Microneedling + Sérum Booster • تحفيز الكولاجين ونضارة فورية',
        'العناية بالبشرة',
        '/media/reels/reel-4.mp4',
        '/media/reels/reel-4-poster.webp',
        'https://www.instagram.com/joven_institut/reel/DepQwh1sd0A/',
        4
      ]
    ];

    for (const r of initialReels) {
      insertReel.run(...r);
    }
  }

  // Seed Story Highlights if empty
  const hlCount = db.prepare('SELECT COUNT(*) as count FROM highlights').get().count;
  if (Number(hlCount) === 0) {
    console.log('Seeding initial 6 story highlights into joven.db...');
    const insertHl = db.prepare(`
      INSERT INTO highlights (title, category, cover_url, stories_count, sort_order)
      VALUES (?, ?, ?, ?, ?)
    `);

    const initialHighlights = [
      ['Hydrafacial', 'العناية بالبشرة', '/media/brand/hl-1.webp', 6, 1],
      ['Head Spa', 'الشعر والسبا', '/media/brand/hl-2.webp', 8, 2],
      ['Onglerie BIAB', 'الأظافر والتجميل', '/media/brand/hl-3.webp', 5, 3],
      ['Soins Visage', 'العناية بالبشرة', '/media/brand/hl-4.webp', 7, 4],
      ['Tarifs & Packs', 'باقات وعروض', '/media/brand/hl-5.webp', 4, 5],
      ['Avis Clientes', 'شهادات موثقة', '/media/brand/hl-6.webp', 12, 6]
    ];

    for (const hl of initialHighlights) {
      insertHl.run(...hl);
    }
  }

  // Seed 12 Instagram Feed posts if empty
  const igCount = db.prepare('SELECT COUNT(*) as count FROM instagram_posts').get().count;
  if (Number(igCount) === 0) {
    console.log('Seeding 12 Instagram feed posts into joven.db...');
    const insertIg = db.prepare(`
      INSERT INTO instagram_posts (title, category, image_url, caption, likes_count, date_posted, permalink)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const initialIgPosts = [
      [
        'Soin Hydrafacial Prestige 6 Étapes',
        'نتائج البشرة',
        '/media/feed/ig-1.webp',
        'استمتعي بنظافة عميقة وإشراقة ساحرة تدوم لأسابيع مع بروتوكول الهايدرافيشال المعتمد في حيدرة. 6 مراحل متتالية لتنظيف المسام وتغذية البشرة بأحدث الأمصال. ✨🇩🇿',
        342,
        'منذ يومين',
        'https://www.instagram.com/joven_institut/'
      ],
      [
        'Japanese Head Spa & Cascade d Eau',
        'الشعر والسبا',
        '/media/feed/ig-2.webp',
        'طقس السبا الياباني الأكثر طلباً في معهد جوفان: شلال الماء الدافئ، ديتوكس فروة الرأس بمساج الضغط وتدليك الرقبة والأكتاف في فضاء نسائي مغلق 100%. 🌿🧘‍♀️',
        428,
        'منذ 4 أيام',
        'https://www.instagram.com/joven_institut/'
      ],
      [
        'Manucure Russe & Renforcement BIAB',
        'الأظافر BIAB',
        '/media/feed/ig-3.webp',
        'الأناقة تبدأ من أطراف أصابعكِ! دقة تقنية المانيكير الروسي مع تعزيز الجل بياب (BIAB) لحماية الأظافر الطبيعية وثبات يدوم لأكثر من شهر. 💅💎',
        289,
        'منذ أسبوع',
        'https://www.instagram.com/joven_institut/'
      ],
      [
        'Microneedling & Sérum Collagène Boost',
        'نتائج البشرة',
        '/media/feed/ig-4.webp',
        'تحفيز إنتاج الكولاجين الطبيعي وعلاج المسام الواسعة والتصبغات للحصول على بشرة ناعمة مخملية ومشرقة بدون مكياج. 🌸✨',
        215,
        'منذ أسبوع',
        'https://www.instagram.com/joven_institut/'
      ],
      [
        'Suite Privée & Préparation Mariée Royale',
        'أجواء المعهد',
        '/media/feed/ig-5.webp',
        'جناح خاص ومستقل مهيأ لخدمة عرائسنا في جو من الراحة والسكينة المطلقة مع مرافقة خبيراتنا طوال اليوم الخاص. 👰🤍',
        512,
        'منذ 10 أيام',
        'https://www.instagram.com/joven_institut/'
      ],
      [
        'Pédicure Médicale & Bain d Huiles Essentielles',
        'الأظافر BIAB',
        '/media/feed/ig-6.webp',
        'جلسة متكاملة لعلاج الأقدام المجهدة، إزالة التشققات والجلد الميت مع تدليك استرخائي وتعقيم طبي صارم بأعلى المعايير. 🦶✨',
        198,
        'منذ أسبوعين',
        'https://www.instagram.com/joven_institut/'
      ],
      [
        'Rehaussement de Cils & Brow Lift Kératine',
        'نتائج البشرة',
        '/media/feed/ig-7.webp',
        'عيون طبيعية ساحرة ومفتوحة بدون مسكرة! رفع الرموش وترتيب الحواجب مع تغذية مكثفة بالكيراتين والبوتوكس. 👁️💖',
        264,
        'منذ أسبوعين',
        'https://www.instagram.com/joven_institut/'
      ],
      [
        'Soin Coup d Éclat Express Hydra',
        'نتائج البشرة',
        '/media/feed/ig-8.webp',
        'جلسة مكثفة لمدة 60 دقيقة تعيد لبشرتك حيويتها وانتعاشها قبل مناسباتك المهمة في نهاية الأسبوع. 🌟',
        310,
        'منذ 3 أسابيع',
        'https://www.instagram.com/joven_institut/'
      ],
      [
        'Peeling Doux aux Acides de Fruits',
        'نتائج البشرة',
        '/media/feed/ig-9.webp',
        'تجديد خلايا البشرة وتوحيد لونها بأمان تام مع أحماض الفواكه الطبية المناسبة لجميع أنواع البشرة حتى الحساسة. 🍋🍃',
        186,
        'منذ شهر',
        'https://www.instagram.com/joven_institut/'
      ],
      [
        'Massage Crânien & Aromathérapie Détox',
        'الشعر والسبا',
        '/media/feed/ig-10.webp',
        'تخلصي من الإرهاق والصداع التوتري مع جلسة تدليك الرأس والأكتاف بالزيوت العطرية المهدئة في حيدرة. 💆‍♀️✨',
        375,
        'منذ شهر',
        'https://www.instagram.com/joven_institut/'
      ],
      [
        'French Manucure Élégance & Finition Miroir',
        'الأظافر BIAB',
        '/media/feed/ig-11.webp',
        'كلاسيكية لا تموت مع لمسة جوفان الباريسية الخاصة، دقة متناهية ولمعان كريستالي فائق. 💅🤍',
        290,
        'منذ شهر',
        'https://www.instagram.com/joven_institut/'
      ],
      [
        'Sanctuaire de Beauté Féminin à Hydra',
        'أجواء المعهد',
        '/media/feed/ig-12.webp',
        'أهلاً بكِ في ملاذكِ الآمن بحيدرة، حيث يجتمع الهدوء والأناقة والخبرة الطبية لنمنحكِ التجربة التي تستحقينها. 🏛️🌿',
        460,
        'منذ شهرين',
        'https://www.instagram.com/joven_institut/'
      ]
    ];

    for (const post of initialIgPosts) {
      insertIg.run(...post);
    }
  }
}

// Run seed check
seedDatabase();

module.exports = {
  db,
  getBootstrapData: () => {
    const settingsRows = db.prepare('SELECT key, value FROM settings').all();
    const settings = {};
    for (const row of settingsRows) {
      settings[row.key] = row.value;
    }
    const services = db.prepare('SELECT * FROM services ORDER BY sort_order ASC, id ASC').all();
    const gallery = db.prepare('SELECT * FROM gallery ORDER BY id ASC').all();
    const reels = db.prepare('SELECT * FROM reels ORDER BY sort_order ASC, id ASC').all();
    const highlights = db.prepare('SELECT * FROM highlights ORDER BY sort_order ASC, id ASC').all();
    const instagram_posts = db.prepare('SELECT * FROM instagram_posts ORDER BY id ASC').all();
    const faqs = db.prepare('SELECT * FROM faqs ORDER BY id ASC').all();
    return { settings, services, gallery, reels, highlights, instagram_posts, faqs };
  }
};
