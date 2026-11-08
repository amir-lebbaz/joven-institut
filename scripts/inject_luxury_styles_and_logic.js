const fs = require('fs');

let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Add Canvas into Hero section right after <section class="hero" id="accueil">
const heroSectionTag = '<section class="hero" id="accueil">';
const canvasMarkup = `
  <!-- Luxury Feminine Floating Sparkles Canvas -->
  <canvas id="luxurySparklesCanvas" class="luxury-sparkles-canvas" aria-hidden="true"></canvas>
`;

if (!html.includes('id="luxurySparklesCanvas"')) {
  html = html.replace(heroSectionTag, heroSectionTag + '\n' + canvasMarkup);
  console.log('Added luxury sparkles canvas to Hero.');
}

// 2. Add Luxury Hero Video & Animation Styles into <style>
const luxuryStyles = `
    /* ============================================================
       HIGH-END LUXURY HERO VIDEO & FEMININE ANIMATIONS
    ============================================================ */
    .luxury-sparkles-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      opacity: 0.75;
    }

    .hero-media {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .hero-luxury-frame {
      position: relative;
      width: 100%;
      max-width: 410px;
      margin: 0 auto;
    }

    .hero-frame-glow {
      position: absolute;
      inset: -15px;
      background: radial-gradient(circle, rgba(198, 107, 135, 0.28) 0%, rgba(194, 147, 85, 0.2) 45%, transparent 75%);
      filter: blur(24px);
      z-index: 1;
      pointer-events: none;
      border-radius: 36px;
      animation: frameBreathe 4s ease-in-out infinite alternate;
    }

    @keyframes frameBreathe {
      0% { opacity: 0.6; transform: scale(0.98); }
      100% { opacity: 0.95; transform: scale(1.02); }
    }

    .hero-video-card {
      position: relative;
      border-radius: 28px;
      overflow: hidden;
      background: #180D12;
      box-shadow: 0 25px 60px rgba(148, 64, 87, 0.25), 0 0 0 1.5px rgba(194, 147, 85, 0.35);
      aspect-ratio: 9 / 14;
      max-height: 540px;
      width: 100%;
      z-index: 2;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
    }

    .hero-video-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 30px 70px rgba(148, 64, 87, 0.3), 0 0 0 2px rgba(194, 147, 85, 0.55);
    }

    .hero-video-player {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
      display: block;
      background: #180D12;
      cursor: pointer;
    }

    .hero-video-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(20, 10, 14, 0.45) 0%, transparent 22%, transparent 60%, rgba(20, 10, 14, 0.75) 100%);
      pointer-events: none;
      z-index: 2;
    }

    /* Live Top Badge */
    .hero-live-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      z-index: 3;
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      padding: 6px 14px;
      border-radius: 30px;
      font-size: 0.76rem;
      font-weight: 700;
      color: #944057;
      box-shadow: 0 4px 16px rgba(0,0,0,0.12);
      border: 1px solid rgba(194, 147, 85, 0.2);
    }

    html[dir="rtl"] .hero-live-badge {
      left: auto;
      right: 16px;
    }

    .live-beacon {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #10B981;
      display: inline-block;
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
      animation: beaconPulse 2s infinite;
    }

    @keyframes beaconPulse {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }

    .hero-quality-chip {
      position: absolute;
      top: 16px;
      right: 16px;
      z-index: 3;
      background: rgba(18, 10, 14, 0.65);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.72rem;
      font-weight: 600;
      color: #F8E8D8;
      border: 1px solid rgba(194, 147, 85, 0.35);
      letter-spacing: 0.5px;
    }

    html[dir="rtl"] .hero-quality-chip {
      right: auto;
      left: 16px;
    }

    /* Bottom Controls */
    .hero-video-controls {
      position: absolute;
      bottom: 14px;
      left: 14px;
      right: 14px;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      background: rgba(22, 12, 16, 0.72);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      padding: 8px 12px;
      border-radius: 22px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      box-shadow: 0 10px 25px rgba(0,0,0,0.35);
    }

    .hero-sound-btn {
      display: flex;
      align-items: center;
      gap: 7px;
      background: rgba(255, 255, 255, 0.18);
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.25);
      padding: 7px 14px;
      border-radius: 18px;
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;
      font-family: inherit;
    }

    .hero-sound-btn:hover {
      background: #944057;
      border-color: #944057;
      transform: translateY(-1px);
    }

    .hero-ctrl-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .hero-ctrl-circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.18);
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.85rem;
    }

    .hero-ctrl-circle:hover {
      background: rgba(255, 255, 255, 0.35);
      transform: scale(1.08);
    }

    /* Floating Stat Box */
    .hero-floating-stat {
      position: absolute;
      bottom: -18px;
      right: -16px;
      z-index: 4;
      background: #FFFFFF;
      padding: 12px 18px;
      border-radius: 18px;
      box-shadow: 0 15px 35px rgba(148, 64, 87, 0.16);
      border: 1px solid rgba(194, 147, 85, 0.25);
      display: flex;
      align-items: center;
      gap: 10px;
      animation: floatSubtle 3.5s ease-in-out infinite alternate;
    }

    html[dir="rtl"] .hero-floating-stat {
      right: auto;
      left: -16px;
    }

    @keyframes floatSubtle {
      0% { transform: translateY(0); }
      100% { transform: translateY(-5px); }
    }

    .stat-stars {
      color: #F59E0B;
      font-size: 0.95rem;
      letter-spacing: 1px;
    }

    .stat-text strong {
      display: block;
      font-size: 0.82rem;
      color: var(--text-main);
      font-weight: 700;
    }

    .stat-text span {
      display: block;
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    /* FEMININE LUXURY SHIMMER & GLOW KEYFRAMES */
    @keyframes luxuryGoldSheen {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .hero-badge-tag, .offers-badge-pill, .ba-pill {
      position: relative;
      overflow: hidden;
    }

    .hero-badge-tag::after, .offers-badge-pill::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.6) 45%, rgba(212, 168, 106, 0.45) 55%, transparent 75%);
      background-size: 200% 100%;
      animation: luxuryGoldSheen 4.5s ease-in-out infinite;
      pointer-events: none;
    }

    /* Subtle Feminine CTA Pulse Glow */
    @keyframes pulseGlowFeminine {
      0% {
        box-shadow: 0 10px 25px rgba(148, 64, 87, 0.28), 0 0 0 0 rgba(198, 107, 135, 0.45);
      }
      70% {
        box-shadow: 0 12px 32px rgba(148, 64, 87, 0.32), 0 0 0 12px rgba(198, 107, 135, 0);
      }
      100% {
        box-shadow: 0 10px 25px rgba(148, 64, 87, 0.28), 0 0 0 0 rgba(198, 107, 135, 0);
      }
    }

    .hero-cta {
      animation: pulseGlowFeminine 3.2s infinite;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-cta:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 15px 35px rgba(148, 64, 87, 0.35);
    }

    /* RESPONSIVE HERO VIDEO TUNING */
    @media (max-width: 992px) {
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 36px;
      }
      .hero-content {
        order: 2;
        text-align: center;
      }
      .hero-features {
        justify-content: center;
      }
      .hero-actions {
        justify-content: center;
      }
      .hero-media {
        order: 1;
        width: 100%;
      }
      .hero-luxury-frame {
        max-width: 360px;
      }
      .hero-video-card {
        height: 480px;
        aspect-ratio: 9 / 14;
      }
      .hero-floating-stat {
        bottom: -14px;
        right: 50%;
        transform: translateX(50%);
      }
      html[dir="rtl"] .hero-floating-stat {
        right: auto;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    @media (max-width: 600px) {
      .hero-luxury-frame {
        max-width: 320px;
      }
      .hero-video-card {
        height: 440px;
        border-radius: 24px;
      }
      .hero-sound-btn {
        padding: 6px 10px;
        font-size: 0.72rem;
      }
      .hero-ctrl-circle {
        width: 28px;
        height: 28px;
        font-size: 0.75rem;
      }
      .hero-floating-stat {
        padding: 8px 14px;
        border-radius: 14px;
        width: calc(100% - 24px);
        max-width: 290px;
      }
    }
`;

// Insert styles right before </head>
html = html.replace('</head>', luxuryStyles + '\n</head>');
console.log('Inserted luxury styles into <head>.');

// 3. Add JavaScript logic for Hero Video & Particles
const luxuryJs = `
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
            link.setAttribute('href', currentHref.replace(/wa\.me\/[0-9]+/, 'wa.me/' + waNum));
          });
        }
      } catch (err) {
        console.warn('Live config sync warning:', err);
      }
    }
`;

// Insert JS right before </script> and </body>
const lastScriptEnd = html.lastIndexOf('</script>');
if (lastScriptEnd !== -1) {
  html = html.slice(0, lastScriptEnd) + luxuryJs + '\n' + html.slice(lastScriptEnd);
  console.log('Inserted luxury JS logic.');
}

// 4. Update I18N dictionary with new keys
const frMarker = 'fr: {';
const arMarker = 'ar: {';
const enMarker = 'en: {';

const frAdd = `
      btn_unmute: "Activer le son",
      btn_mute: "Couper le son",
      hero_stat_sub: "Cadre haut standing à Hydra",`;

const arAdd = `
      btn_unmute: "تشغيل الصوت",
      btn_mute: "كتم الصوت",
      hero_stat_sub: "أجواء راقية وخاصة في حيدرة",`;

const enAdd = `
      btn_unmute: "Unmute Audio",
      btn_mute: "Mute Audio",
      hero_stat_sub: "Luxury private haven in Hydra",`;

if (html.includes(frMarker) && !html.includes('btn_unmute:')) {
  html = html.replace(frMarker, frMarker + frAdd);
  html = html.replace(arMarker, arMarker + arAdd);
  html = html.replace(enMarker, enMarker + enAdd);
  console.log('Updated I18N dictionary.');
}

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Successfully updated public/index.html with luxury hero video & animations.');
