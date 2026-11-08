const fs = require('fs');
const path = require('path');

console.log('Starting comprehensive update for Hero video, Admin studio, and Luxury animations...');

// 1. UPDATE public/index.html
let html = fs.readFileSync('public/index.html', 'utf8');

// A. Remove #visite-video section
const visiteStart = html.indexOf('<!-- ============================================================\n       SECTION: REELS & VISITE VIDÉO RÉELLE');
const visiteAlt = html.indexOf('<section class="video-tour-section" id="visite-video">');
const actualVisiteStart = visiteStart !== -1 ? visiteStart : visiteAlt;

if (actualVisiteStart !== -1) {
  const aproposStart = html.indexOf('<section class="about-section" id="apropos">', actualVisiteStart);
  if (aproposStart !== -1) {
    html = html.slice(0, actualVisiteStart) + html.slice(aproposStart);
    console.log('Removed #visite-video section successfully.');
  } else {
    console.warn('Could not find #apropos after #visite-video');
  }
}

// B. Remove switchMainVideo function
const switchFnIdx = html.indexOf('function switchMainVideo(');
if (switchFnIdx !== -1) {
  const switchFnEnd = html.indexOf('}', html.indexOf('document.getElementById(\'visite-video\')', switchFnIdx));
  if (switchFnEnd !== -1) {
    html = html.slice(0, switchFnIdx) + html.slice(switchFnEnd + 1);
    console.log('Removed switchMainVideo function.');
  }
}

// C. Replace Hero media block
const heroMediaStart = html.indexOf('<div class="hero-media">');
if (heroMediaStart !== -1) {
  const heroMediaEnd = html.indexOf('</div>\n\n      </div>\n    </div>\n  </section>', heroMediaStart);
  // Alternative match
  const closeHeroMedia = html.indexOf('</div>\n        </div>\n\n      </div>', heroMediaStart);
  const targetEnd = heroMediaEnd !== -1 ? heroMediaEnd : (closeHeroMedia !== -1 ? closeHeroMedia + 15 : -1);

  if (targetEnd !== -1) {
    // Find exact matching </div> for hero-media
    const closingDiv = html.indexOf('</div>\n        </div>', heroMediaStart);
    const heroMediaChunk = html.slice(heroMediaStart, closingDiv + 15);
    
    const newHeroMedia = `<!-- Right Visual: Luxury Portrait Video Reel Showcase -->
        <div class="hero-media">
          <div class="hero-luxury-frame">
            <!-- Ambient Glow behind the showcase -->
            <div class="hero-frame-glow"></div>

            <!-- Luxury Video Card with 9:14 Portrait Ratio -->
            <div class="hero-video-card" id="heroVideoCard">
              <video id="heroSalonVideo" class="hero-video-player" playsinline webkit-playsinline muted autoplay loop preload="metadata" poster="media/authentic/hero_interior.jpg">
                <source src="https://mtuhuzmyhbemdfsbyhpf.supabase.co/storage/v1/object/public/joven-media/videos/video_welcome.mp4" type="video/mp4">
                Votre navigateur ne supporte pas la vidéo.
              </video>

              <!-- Luxury Vignette Overlay -->
              <div class="hero-video-overlay"></div>

              <!-- Top Left: Verified Salon Pill -->
              <div class="hero-live-badge">
                <span class="live-beacon"></span>
                <span data-i18n="badge_authentic">Institut JOVEN • Hydra, Alger</span>
              </div>

              <!-- Top Right: Quality Tag -->
              <div class="hero-quality-chip">
                <span>✨ 4K Immersion</span>
              </div>

              <!-- Bottom Glass Controls Bar -->
              <div class="hero-video-controls">
                <button type="button" class="hero-sound-btn" id="heroSoundBtn" onclick="toggleHeroSound()" aria-label="Activer ou couper le son">
                  <span id="heroSoundIcon" class="ctrl-icon">🔇</span>
                  <span id="heroSoundText" data-i18n="btn_unmute">Activer le son</span>
                </button>
                <div class="hero-ctrl-group">
                  <button type="button" class="hero-ctrl-circle" id="heroPlayBtn" onclick="toggleHeroPlay()" aria-label="Pause ou Lecture" title="Pause / Lecture">
                    <span id="heroPlayIcon">⏸</span>
                  </button>
                  <button type="button" class="hero-ctrl-circle" onclick="openHeroFullscreen()" aria-label="Plein écran" title="Plein écran">
                    <span>⛶</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Chic Floating Badge: Social Proof -->
            <div class="hero-floating-stat">
              <div class="stat-stars">★★★★★</div>
              <div class="stat-text">
                <strong>100% Féminin & Privatisé</strong>
                <span data-i18n="hero_stat_sub">Cadre haut standing à Hydra</span>
              </div>
            </div>
          </div>
        </div>`;

    html = html.replace(heroMediaChunk, newHeroMedia);
    console.log('Replaced hero-media with luxury video showcase.');
  }
}

// Write temporary updated html
fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Step 1 applied to index.html');
