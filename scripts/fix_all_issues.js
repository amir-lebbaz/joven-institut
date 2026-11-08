const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'public', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Fix the broken comment that swallowed <section id="soins">
html = html.replace(
  `  <!-- ============================================================
       SECTION: NOS SOINS (Full Catalog & Filters)
  ============================================================ */
  <section class="soins-section" id="soins">`,
  `  <!-- ============================================================
       SECTION: NOS SOINS (Full Catalog & Filters)
  ============================================================ -->
  <section class="soins-section" id="soins">`
);

// 2. Add <base href="./"> in <head> for bulletproof asset resolution on GitHub Pages
if (!html.includes('<base href="./">')) {
  html = html.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n  <base href="./">');
}

// 3. Replace all "/media/ with "media/ and '/media/ with 'media/
html = html.replace(/href=["']\/media\//g, 'href="media/');
html = html.replace(/src=["']\/media\//g, 'src="media/');
html = html.replace(/openVideoModal\(['"]\/media\/([^'"]+)['"]\)/g, "openVideoModal('media/$1')");
html = html.replace(/openImageModal\(['"]\/media\/([^'"]+)['"]/g, "openImageModal('media/$1'");

// 4. Update default video URL to the high-speed Supabase CDN URL
const SUPABASE_WELCOME_VIDEO = 'https://mtuhuzmyhbemdfsbyhpf.supabase.co/storage/v1/object/public/joven-media/videos/video_welcome.mp4';
const SUPABASE_CALLUS_VIDEO = 'https://mtuhuzmyhbemdfsbyhpf.supabase.co/storage/v1/object/public/joven-media/videos/video_callus.mp4';
const SUPABASE_HF_VIDEO = 'https://mtuhuzmyhbemdfsbyhpf.supabase.co/storage/v1/object/public/joven-media/videos/video_haute_frequence.mp4';

html = html.replace("openVideoModal('media/authentic/video_welcome.mp4')", `openVideoModal('${SUPABASE_WELCOME_VIDEO}')`);

// 5. Add a dedicated prominent Video Reels Showcase section right before the Gallery or About
const reelsSectionHTML = `
  <!-- ============================================================
       SECTION: REELS & VISITE VIDÉO RÉELLE
  ============================================================ -->
  <section class="video-tour-section" id="visite-video">
    <div class="container">
      <div class="section-header">
        <span class="offers-badge-pill" data-i18n="reels_badge">Vidéo Authentique • ريلز الصالون الحصري</span>
        <h2 class="section-title" data-i18n="video_tour_title">Visite Guidée & Présentation</h2>
        <p class="section-subtitle" data-i18n="video_tour_subtitle">Découvrez l'institut en vidéo réelle : notre cadre chaleureux à Hydra, nos cabines et l'expertise de notre équipe.</p>
      </div>

      <div class="video-showcase-wrap">
        <!-- Main Video Reel Player -->
        <div class="video-main-card">
          <div class="video-player-container">
            <video id="salonMainVideo" playsinline controls loop preload="metadata" poster="media/authentic/hero_interior.jpg" src="${SUPABASE_WELCOME_VIDEO}">
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
          <div class="video-card-details">
            <span class="video-card-tag">📍 Hydra, Alger</span>
            <h3 class="video-card-h3" data-i18n="video_card_title">Bienvenue chez JOVEN Institut</h3>
            <p class="video-card-desc" data-i18n="video_card_desc">
              Découvrez en vidéo notre institut situé à Hydra : un accueil bienveillant, une hygiène clinique irréprochable et des équipements esthétiques de pointe pour sublimer votre beauté naturelle.
            </p>
            <div class="video-card-meta">
              <span>🕒 Du Lundi au Samedi (9h - 17h)</span>
              <span>🔒 100% Féminin & Privatisé</span>
            </div>
            <a href="https://wa.me/213781088061?text=${encodeURIComponent('Bonjour JOVEN Institut, j\'ai vu votre vidéo de présentation et je souhaite réserver !')}" target="_blank" rel="noopener" class="offer-btn" style="margin-top: 16px;">
              <span>💬</span> <span data-i18n="btn_book_after_video">Réserver ma séance sur WhatsApp</span>
            </a>
          </div>
        </div>

        <!-- Secondary Video Cards / Highlights -->
        <div class="video-side-grid">
          <!-- Reel 2: Callus Peeling -->
          <div class="video-mini-card" onclick="switchMainVideo('${SUPABASE_CALLUS_VIDEO}', 'Soin Callus Peeling Pieds Doux')">
            <div class="mini-thumb">
              <img src="media/callus_after.jpg" alt="Callus Peeling Reel">
              <div class="mini-play">▶</div>
            </div>
            <div class="mini-info">
              <h4>Callus Peeling</h4>
              <p>Élimination des callosités en vidéo</p>
              <span class="mini-tag">Best Seller</span>
            </div>
          </div>

          <!-- Reel 3: Haute Fréquence & Soin Peau -->
          <div class="video-mini-card" onclick="switchMainVideo('${SUPABASE_HF_VIDEO}', 'Soin Haute Fréquence & Peau Nette')">
            <div class="mini-thumb">
              <img src="media/hydra_after.jpg" alt="Haute Fréquence Reel">
              <div class="mini-play">▶</div>
            </div>
            <div class="mini-info">
              <h4>Haute Fréquence</h4>
              <p>Purification & éclat immédiat</p>
              <span class="mini-tag">Soin Visage</span>
            </div>
          </div>

          <!-- Reel 1 reset: Visite Guidée -->
          <div class="video-mini-card" onclick="switchMainVideo('${SUPABASE_WELCOME_VIDEO}', 'Bienvenue chez JOVEN Institut')">
            <div class="mini-thumb">
              <img src="media/authentic/hero_interior.jpg" alt="Visite guidée Reel">
              <div class="mini-play">▶</div>
            </div>
            <div class="mini-info">
              <h4>Visite du Salon</h4>
              <p>Présentation & localisation à Hydra</p>
              <span class="mini-tag">Le Salon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

if (!html.includes('id="visite-video"')) {
  html = html.replace('<section class="about-section" id="apropos">', `${reelsSectionHTML}\n  <section class="about-section" id="apropos">`);
}

// 6. Add CSS for Video Showcase Section
const videoCSS = `
    /* ==========================================================
       VIDEO TOUR & REELS SHOWCASE STYLES
    ========================================================== */
    .video-tour-section {
      padding: 70px 0 80px;
      background: linear-gradient(180deg, #FDF9F7 0%, #FFF5F7 100%);
      position: relative;
    }
    .video-showcase-wrap {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 32px;
      align-items: center;
      margin-top: 36px;
    }
    .video-main-card {
      background: #FFFFFF;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 15px 45px rgba(148, 64, 87, 0.08);
      border: 1px solid rgba(194, 147, 85, 0.25);
      display: flex;
      flex-direction: column;
    }
    .video-player-container {
      position: relative;
      background: #000;
      width: 100%;
      aspect-ratio: 16/9;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .video-player-container video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .video-card-details {
      padding: 26px 28px;
    }
    .video-card-tag {
      display: inline-block;
      font-size: 0.78rem;
      font-weight: 700;
      color: #944057;
      background: #FBEFF2;
      padding: 4px 10px;
      border-radius: 20px;
      margin-bottom: 10px;
    }
    .video-card-h3 {
      font-family: var(--font-serif);
      font-size: 1.55rem;
      color: #2A1D20;
      margin-bottom: 10px;
    }
    [dir="rtl"] .video-card-h3 {
      font-family: 'Cairo', sans-serif;
    }
    .video-card-desc {
      font-size: 0.92rem;
      color: #6E5C62;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .video-card-meta {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      font-size: 0.82rem;
      color: #9E743A;
      font-weight: 600;
      padding-top: 12px;
      border-top: 1px dashed #EEDCD9;
    }
    .video-side-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .video-mini-card {
      background: #FFFFFF;
      border-radius: 18px;
      border: 1px solid #EEDCD9;
      padding: 14px;
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: 0 4px 15px rgba(148, 64, 87, 0.04);
    }
    .video-mini-card:hover {
      transform: translateX(4px);
      box-shadow: 0 8px 25px rgba(148, 64, 87, 0.1);
      border-color: #944057;
    }
    [dir="rtl"] .video-mini-card:hover {
      transform: translateX(-4px);
    }
    .mini-thumb {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      flex-shrink: 0;
      background: #F0ECE9;
    }
    .mini-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .mini-play {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.35);
      color: #FFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      transition: background 0.2s ease;
    }
    .video-mini-card:hover .mini-play {
      background: rgba(148, 64, 87, 0.75);
    }
    .mini-info h4 {
      font-size: 1rem;
      color: #2A1D20;
      margin-bottom: 4px;
      font-weight: 700;
    }
    .mini-info p {
      font-size: 0.82rem;
      color: #6E5C62;
      margin-bottom: 6px;
    }
    .mini-tag {
      font-size: 0.72rem;
      font-weight: 700;
      color: #9E743A;
      background: #F7EFE5;
      padding: 2px 8px;
      border-radius: 6px;
    }
    @media (max-width: 900px) {
      .video-showcase-wrap {
        grid-template-columns: 1fr;
      }
    }
`;

if (!html.includes('VIDEO TOUR & REELS SHOWCASE STYLES')) {
  html = html.replace('</style>', `${videoCSS}\n  </style>`);
}

// 7. Add switchMainVideo function
const switchVideoJS = `
    function switchMainVideo(videoUrl, title) {
      const vid = document.getElementById('salonMainVideo');
      if (vid) {
        vid.src = videoUrl;
        vid.play().catch(() => {});
      }
      const titleEl = document.querySelector('.video-card-h3');
      if (titleEl && title) {
        titleEl.textContent = title;
      }
      document.getElementById('visite-video')?.scrollIntoView({ behavior: 'smooth' });
    }
`;

if (!html.includes('function switchMainVideo')) {
  html = html.replace('function openVideoModal', `${switchVideoJS}\n\n    function openVideoModal`);
}

// 8. Add I18N for Video Section
const frVideoI18n = `
      reels_badge: "Vidéo Authentique • Visite Réelle",
      video_tour_title: "Visite Guidée & Présentation de l'Institut",
      video_tour_subtitle: "Découvrez notre institut en vidéo réelle : notre cadre chaleureux à Hydra, nos cabines et l'expertise de notre équipe.",
      video_card_title: "Bienvenue chez JOVEN Institut",
      video_card_desc: "Découvrez en vidéo notre institut situé à Hydra : un accueil bienveillant, une hygiène clinique irréprochable et des équipements esthétiques de pointe pour sublimer votre beauté naturelle.",
      btn_book_after_video: "Réserver ma séance sur WhatsApp",`;

const arVideoI18n = `
      reels_badge: "فيديو الصالون الحقيقي • ريلز تعريفي",
      video_tour_title: "جولة حقيقية والتعريف بالصالون والخدمات",
      video_tour_subtitle: "فيديو حصري لصاحبة الصالون تعرّف فيه بالموقع في حيدرة، وأجواء الراحة، وأحدث أجهزة العناية بالبشرة والأقدام.",
      video_card_title: "أهلاً بكِ في معهد جفان (JOVEN Institut)",
      video_card_desc: "شاهدي بالفيديو جولة داخل صالون جفان في حيدرة بالجزائر العاصمة: استقبال راقٍ ومريح، تعقيم ونظافة طبية، وأحدث التقنيات التجميلية لخدمتكِ بكل عناية.",
      btn_book_after_video: "حجز موعدي عبر واتساب",`;

const enVideoI18n = `
      reels_badge: "Authentic Video • Real Tour",
      video_tour_title: "Guided Tour & Salon Presentation",
      video_tour_subtitle: "Experience our institute in real video: our serene sanctuary in Hydra, our modern treatment suites and expert care.",
      video_card_title: "Welcome to JOVEN Institut",
      video_card_desc: "Watch the video walkthrough of our private sanctuary in Hydra, Algiers: clinical hygiene, soothing atmosphere, and cutting-edge aesthetic care.",
      btn_book_after_video: "Book my session on WhatsApp",`;

html = html.replace('offers_pill: "Édition Limitée",', `${frVideoI18n}\n      offers_pill: "Édition Limitée",`);
html = html.replace('offers_pill: "لفترة محدودة",', `${arVideoI18n}\n      offers_pill: "لفترة محدودة",`);
html = html.replace('offers_pill: "Limited Edition",', `${enVideoI18n}\n      offers_pill: "Limited Edition",`);

// 9. Smooth scrolling for all navigation links
const smoothScrollJS = `
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
`;

if (!html.includes('Bulletproof smooth scroll handler')) {
  html = html.replace('window.addEventListener(\'scroll\', () => {', `${smoothScrollJS}\n\n    window.addEventListener('scroll', () => {`);
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully fixed index.html! File size:', html.length);
