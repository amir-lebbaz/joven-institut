const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'public', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Add Supabase script tag in <head> if not present
if (!html.includes('cdn.jsdelivr.net/npm/@supabase/supabase-js@2')) {
  html = html.replace('</head>', `  <!-- Supabase Client -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>`);
}

// 2. Add Offers Section CSS before </style>
const offersCSS = `
    /* ==========================================================
       SUPABASE REAL-TIME OFFERS & PROMOTIONS SECTION
    ========================================================== */
    .offers-section {
      margin-top: 48px;
      background: linear-gradient(135deg, #FFF9F8 0%, #FFF0F2 100%);
      border-radius: 24px;
      padding: 40px 30px;
      border: 1px solid rgba(194, 147, 85, 0.25);
      box-shadow: 0 10px 35px rgba(148, 64, 87, 0.05);
    }
    .offers-header {
      text-align: center;
      margin-bottom: 28px;
    }
    .offers-badge-pill {
      display: inline-block;
      background: #FBEFF2;
      color: #944057;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 6px 14px;
      border-radius: 20px;
      margin-bottom: 10px;
      border: 1px solid rgba(148, 64, 87, 0.2);
    }
    .offers-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.8rem;
      color: #2A1D20;
      margin-bottom: 8px;
    }
    [dir="rtl"] .offers-title {
      font-family: 'Cairo', sans-serif;
    }
    .offers-subtitle {
      font-size: 0.95rem;
      color: #6E5C62;
      max-width: 600px;
      margin: 0 auto;
    }
    .offers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      gap: 24px;
    }
    .offer-card {
      background: #FFFFFF;
      border-radius: 18px;
      border: 1px solid #EEDCD9;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(148, 64, 87, 0.04);
      display: flex;
      flex-direction: column;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      position: relative;
    }
    .offer-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 30px rgba(148, 64, 87, 0.12);
    }
    .offer-thumb {
      height: 190px;
      position: relative;
      overflow: hidden;
      background: #F6ECE9;
    }
    .offer-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .offer-card:hover .offer-thumb img {
      transform: scale(1.05);
    }
    .offer-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: linear-gradient(135deg, #944057, #6C2237);
      color: #FFF;
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 10px rgba(148, 64, 87, 0.3);
    }
    [dir="rtl"] .offer-badge {
      right: auto;
      left: 12px;
    }
    .offer-content {
      padding: 22px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .offer-card-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.25rem;
      font-weight: 700;
      color: #2A1D20;
      margin-bottom: 8px;
      line-height: 1.3;
    }
    [dir="rtl"] .offer-card-title {
      font-family: 'Cairo', sans-serif;
    }
    .offer-card-desc {
      font-size: 0.88rem;
      color: #6E5C62;
      line-height: 1.5;
      margin-bottom: 16px;
      flex: 1;
    }
    .offer-price-row {
      display: flex;
      align-items: baseline;
      gap: 10px;
      margin-bottom: 16px;
      padding-top: 10px;
      border-top: 1px dashed #EEDCD9;
    }
    .offer-old-price {
      font-size: 0.95rem;
      text-decoration: line-through;
      color: #A08C92;
    }
    .offer-new-price {
      font-size: 1.4rem;
      font-weight: 800;
      color: #944057;
    }
    .offer-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: linear-gradient(135deg, #25D366, #128C7E);
      color: #FFF;
      padding: 12px 20px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.92rem;
      text-decoration: none;
      transition: all 0.25s ease;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.25);
    }
    .offer-btn:hover {
      filter: brightness(1.08);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(37, 211, 102, 0.35);
    }
`;

if (!html.includes('SUPABASE REAL-TIME OFFERS & PROMOTIONS SECTION')) {
  html = html.replace('</style>', `${offersCSS}\n  </style>`);
}

// 3. Inject Offers HTML markup inside #soins
const offersHTML = `
      <!-- Dynamic Offers Container from Supabase -->
      <div class="offers-section" id="offresSpecialesWrap">
        <div class="offers-header">
          <span class="offers-badge-pill" data-i18n="offers_pill">Édition Limitée • لفترة محدودة</span>
          <h3 class="offers-title" data-i18n="offers_title">Forfaits & Offres Spéciales</h3>
          <p class="offers-subtitle" data-i18n="offers_subtitle">Profitez de nos formules signatures combinant soins d'exception et tarifs avantageux.</p>
        </div>
        <div class="offers-grid" id="offersGridContainer">
          <!-- Dynamic cards populated from Supabase -->
        </div>
      </div>
`;

if (!html.includes('id="offresSpecialesWrap"')) {
  const target = '<div class="carousel-arrows">';
  html = html.replace(target, `${offersHTML}\n      ${target}`);
}

// 4. Add subtle admin access in footer
const adminFooterLink = `<li><a href="/admin" style="opacity: 0.5; font-size: 0.78rem;" title="Espace Propriétaire">🔒 Espace Pro (Admin)</a></li>`;
if (!html.includes('href="/admin"')) {
  html = html.replace('<li><a href="#avis" data-i18n="nav_reviews">Avis</a></li>', `<li><a href="#avis" data-i18n="nav_reviews">Avis</a></li>\n            ${adminFooterLink}`);
}

// 5. Add I18N entries for offers
const i18nFrAddition = `
      offers_pill: "Édition Limitée",
      offers_title: "Forfaits & Offres Spéciales",
      offers_subtitle: "Profitez de nos formules signatures combinant soins d'exception et tarifs avantageux.",
      btn_book_offer: "Réserver cette offre sur WhatsApp",`;

const i18nArAddition = `
      offers_pill: "لفترة محدودة",
      offers_title: "باقات وعروض حصرية",
      offers_subtitle: "استمتعي بباقاتنا المتكاملة التي تجمع بين جلسات العناية الفاخرة وأسعار تفضيلية.",
      btn_book_offer: "حجز هذا العرض عبر واتساب",`;

const i18nEnAddition = `
      offers_pill: "Limited Edition",
      offers_title: "Special Packages & Offers",
      offers_subtitle: "Experience our signature packages combining expert treatments with preferential rates.",
      btn_book_offer: "Book this offer on WhatsApp",`;

if (!html.includes('offers_title:')) {
  html = html.replace('const I18N = {', `const I18N = {\n    fr: {${i18nFrAddition}`);
  html = html.replace('ar: {', `ar: {${i18nArAddition}`);
  html = html.replace('en: {', `en: {${i18nEnAddition}`);
}

// 6. Supabase Client & Dynamic Sync Logic
const supabaseLogic = `
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

    try {
      if (window.supabase) {
        supabaseApp = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
      }
    } catch (e) {
      console.warn('Supabase initialization failed, running with static fallback:', e);
    }

    // Fetch and sync services & offers from Supabase
    async function syncDataFromSupabase() {
      if (!supabaseApp) return;

      try {
        const [servicesRes, offersRes] = await Promise.all([
          supabaseApp.from('services').select('*').eq('is_active', true).order('display_order', { ascending: true }),
          supabaseApp.from('offers').select('*').eq('is_active', true).order('created_at', { ascending: false })
        ]);

        if (!servicesRes.error && servicesRes.data && servicesRes.data.length > 0) {
          window.DYNAMIC_SERVICES = servicesRes.data;
          renderSupabaseServices();
          updateServiceDropdown();
        }

        if (!offersRes.error && offersRes.data && offersRes.data.length > 0) {
          window.DYNAMIC_OFFERS = offersRes.data;
          renderSupabaseOffers();
        }
      } catch (err) {
        console.warn('Could not sync with Supabase (using static fallback):', err);
      }
    }

    function renderSupabaseServices(categoryFilter = 'all') {
      if (!window.DYNAMIC_SERVICES || window.DYNAMIC_SERVICES.length === 0) return;
      const carousel = document.getElementById('soinsCarousel');
      if (!carousel) return;

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

      if (filtered.length === 0) return;

      carousel.innerHTML = filtered.map(s => {
        const title = isAr && s.title_ar ? s.title_ar : s.title;
        const desc = isAr && s.description_ar ? s.description_ar : (s.description || '');
        const price = s.price || '';
        const duration = s.duration || '';
        const img = s.image_url || 'media/hydra_after.jpg';
        const bookText = isAr ? 'حجز الآن' : (isEn ? 'Book Now' : 'Réserver');

        return \`
          <article class="soin-card" data-category="\${s.category || 'all'}" onclick="bookSpecificService('\${title.replace(/'/g, "\\\\'")}')">
            <div class="soin-media">
              <img src="\${img}" alt="\${title}" onerror="this.src='media/hydra_after.jpg'">
              <div class="soin-floating-icon" title="\${title}">
                <svg viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              </div>
            </div>
            <div class="soin-info">
              <div>
                <h3 class="soin-name">\${title}</h3>
                <p class="soin-desc">\${desc}</p>
              </div>
              <div class="soin-meta">
                <span class="soin-price">\${price}</span>
                <span class="soin-duration">⏱ \${duration}</span>
              </div>
              <div class="soin-book-btn">
                <span>💬</span> <span>\${bookText}</span>
              </div>
            </div>
          </article>
        \`;
      }).join('');
    }

    function renderSupabaseOffers() {
      if (!window.DYNAMIC_OFFERS || window.DYNAMIC_OFFERS.length === 0) return;
      const container = document.getElementById('offersGridContainer');
      if (!container) return;

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
            ? \`مرحباً صالون جفان (JOVEN)، أود الاستفادة من هذا العرض الخاص: \${title} (\${o.new_price})\`
            : \`Bonjour JOVEN Institut, je souhaite profiter de votre offre spéciale : \${title} (\${o.new_price})\`
        );
        const waLink = \`https://wa.me/213781088061?text=\${waMsg}\`;

        return \`
          <div class="offer-card">
            <div class="offer-thumb">
              <img src="\${img}" alt="\${title}" onerror="this.src='media/hydra_after.jpg'">
              \${badge ? \`<span class="offer-badge">\${badge}</span>\` : ''}
            </div>
            <div class="offer-content">
              <h4 class="offer-card-title">\${title}</h4>
              <p class="offer-card-desc">\${desc}</p>
              <div class="offer-price-row">
                \${o.old_price ? \`<span class="offer-old-price">\${o.old_price}</span>\` : ''}
                <span class="offer-new-price">\${o.new_price}</span>
              </div>
              <a href="\${waLink}" target="_blank" rel="noopener" class="offer-btn">
                <span>💬</span> \${btnText}
              </a>
            </div>
          </div>
        \`;
      }).join('');
    }

    function updateServiceDropdown() {
      const select = document.getElementById('serviceSelect');
      if (!select || !window.DYNAMIC_SERVICES || window.DYNAMIC_SERVICES.length === 0) return;

      const isAr = (currentLang === 'ar');
      select.innerHTML = window.DYNAMIC_SERVICES.map(s => {
        const title = isAr && s.title_ar ? s.title_ar : s.title;
        return \`<option value="\${title}">\${title} (\${s.price || ''})</option>\`;
      }).join('') + '<option value="Consultation sur place">Consultation sur place</option>';
    }

    // Call sync on page load
    window.addEventListener('DOMContentLoaded', () => {
      syncDataFromSupabase();
    });
`;

if (!html.includes('SUPABASE REAL-TIME INTEGRATION')) {
  html = html.replace('function switchLanguage(lang) {', `${supabaseLogic}\n\n    function switchLanguage(lang) {`);
  
  // Also hook into switchLanguage to re-render dynamic items in new language
  const hookCall = `
      // Re-render Supabase items in new language
      if (typeof renderSupabaseServices === 'function') renderSupabaseServices();
      if (typeof renderSupabaseOffers === 'function') renderSupabaseOffers();
      if (typeof updateServiceDropdown === 'function') updateServiceDropdown();
`;
  html = html.replace('if (typeof updateComparisonCardTexts === "function") updateComparisonCardTexts();', `if (typeof updateComparisonCardTexts === "function") updateComparisonCardTexts();${hookCall}`);
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully injected Supabase integration into index.html! File size:', html.length);
