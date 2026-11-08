const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const targetMobileRule = `@media (max-width: 600px) {
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
    }`;

const refinedMobileRule = `@media (max-width: 600px) {
      .hero-luxury-frame {
        max-width: 330px;
      }
      .hero-video-card {
        height: 450px;
        border-radius: 24px;
      }
      .hero-live-badge {
        top: 10px;
        left: 10px;
        padding: 4px 10px;
        font-size: 0.68rem;
        gap: 5px;
      }
      html[dir="rtl"] .hero-live-badge {
        left: auto;
        right: 10px;
      }
      .hero-quality-chip {
        top: 10px;
        right: 10px;
        padding: 4px 8px;
        font-size: 0.65rem;
      }
      html[dir="rtl"] .hero-quality-chip {
        right: auto;
        left: 10px;
      }
      .hero-video-controls {
        bottom: 12px;
        left: 10px;
        right: 10px;
        padding: 6px 10px;
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
        bottom: -14px;
        left: 50% !important;
        right: auto !important;
        transform: translateX(-50%) !important;
        padding: 8px 14px;
        border-radius: 14px;
        width: 86%;
        max-width: 280px;
        justify-content: center;
        text-align: center;
      }
      html[dir="rtl"] .hero-floating-stat {
        left: 50% !important;
        right: auto !important;
        transform: translateX(-50%) !important;
      }
    }`;

if (html.includes(targetMobileRule)) {
  html = html.replace(targetMobileRule, refinedMobileRule);
  fs.writeFileSync('public/index.html', html, 'utf8');
  console.log('Polished mobile layout rules!');
}
