const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'public', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Insert CSS for Before/After Section
const cssToInject = `
    /* ============================================================
       SECTION: AVANT / APRÈS (Interactive Comparison Slider)
    ============================================================ */
    .comparison-section {
      padding: 85px 0 95px;
      background: linear-gradient(180deg, #FFFFFF 0%, rgba(250, 243, 245, 0.85) 50%, #FFFFFF 100%);
      position: relative;
    }

    .comparison-badge-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      background: #FFFFFF;
      border: 1px solid rgba(220, 185, 198, 0.6);
      border-radius: var(--radius-pill);
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--rose-primary);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 12px;
      box-shadow: 0 3px 12px rgba(198, 107, 135, 0.09);
    }

    /* Treatment Switcher Tabs */
    .ba-tabs {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin: 28px auto 38px;
      flex-wrap: wrap;
      max-width: 860px;
    }

    .ba-tab {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 22px;
      background: #FFFFFF;
      border: 1.5px solid rgba(220, 185, 198, 0.45);
      border-radius: var(--radius-pill);
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-main);
      cursor: pointer;
      transition: var(--transition);
      box-shadow: 0 3px 12px rgba(0,0,0,0.03);
    }

    .ba-tab:hover {
      border-color: var(--rose-primary);
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(198, 107, 135, 0.15);
    }

    .ba-tab.active {
      background: var(--rose-btn);
      border-color: var(--rose-btn);
      color: #FFFFFF;
      box-shadow: var(--shadow-btn);
    }

    .ba-tab-icon {
      font-size: 1.15rem;
    }

    .ba-tab-price {
      font-size: 0.78rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: var(--radius-pill);
      background: rgba(198, 107, 135, 0.12);
      color: var(--rose-primary);
      transition: var(--transition);
    }

    .ba-tab.active .ba-tab-price {
      background: rgba(255, 255, 255, 0.25);
      color: #FFFFFF;
    }

    /* Main Container Layout: 2 Columns (Slider + Info) */
    .ba-container-layout {
      display: grid;
      grid-template-columns: 1.25fr 1fr;
      gap: 40px;
      align-items: center;
      max-width: 1140px;
      margin: 0 auto;
    }

    /* Comparison Viewer Box */
    .ba-viewer-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .ba-slider-stage {
      --split: 50%;
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      max-width: 540px;
      border-radius: var(--radius-xl);
      overflow: hidden;
      box-shadow: 0 16px 45px rgba(198, 107, 135, 0.18);
      background: #E8DCDD;
      cursor: ew-resize;
      user-select: none;
      -webkit-user-select: none;
      touch-action: pan-y;
      border: 4px solid #FFFFFF;
    }

    .ba-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      pointer-events: none;
    }

    .ba-img-after {
      z-index: 1;
    }

    .ba-img-before {
      z-index: 2;
      clip-path: inset(0 calc(100% - var(--split, 50%)) 0 0);
      will-change: clip-path;
    }

    html[dir="rtl"] .ba-img-before {
      clip-path: inset(0 0 0 calc(100% - var(--split, 50%)));
    }

    /* Floating Labels on Images */
    .ba-tag {
      position: absolute;
      top: 18px;
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      font-size: 0.74rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      z-index: 5;
      pointer-events: none;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
    }

    .ba-tag-before {
      left: 18px;
      background: rgba(23, 22, 26, 0.78);
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    html[dir="rtl"] .ba-tag-before {
      left: auto;
      right: 18px;
    }

    .ba-tag-after {
      right: 18px;
      background: rgba(198, 107, 135, 0.92);
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.35);
    }

    html[dir="rtl"] .ba-tag-after {
      right: auto;
      left: 18px;
    }

    /* Split Handle & Glowing Knob */
    .ba-handle {
      position: absolute;
      top: 0;
      bottom: 0;
      left: var(--split, 50%);
      width: 2px;
      z-index: 6;
      pointer-events: none;
      transform: translateX(-50%);
    }

    html[dir="rtl"] .ba-handle {
      left: auto;
      right: var(--split, 50%);
      transform: translateX(50%);
    }

    .ba-handle-line {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 2.5px;
      transform: translateX(-50%);
      background: #FFFFFF;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    }

    .ba-handle-knob {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #FFFFFF;
      box-shadow: 0 4px 20px rgba(198, 107, 135, 0.45), 0 0 0 3px rgba(255, 255, 255, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--rose-primary);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .ba-slider-stage:hover .ba-handle-knob,
    .ba-slider-stage:active .ba-handle-knob {
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 6px 26px rgba(198, 107, 135, 0.65), 0 0 0 4px rgba(255, 255, 255, 1);
    }

    .ba-handle-arrows {
      width: 20px;
      height: 20px;
    }

    .ba-range-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      margin: 0;
      cursor: ew-resize;
      z-index: 10;
    }

    .ba-drag-hint {
      margin-top: 14px;
      font-size: 0.84rem;
      font-weight: 600;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .ba-drag-hint span:not([data-i18n]) {
      color: var(--rose-primary);
      font-weight: bold;
      animation: pulseArrows 1.8s infinite alternate;
    }

    /* Treatment Details & Booking Card */
    .ba-info-card {
      background: #FFFFFF;
      border-radius: var(--radius-xl);
      padding: 36px 32px;
      box-shadow: 0 10px 35px rgba(198, 107, 135, 0.1);
      border: 1px solid rgba(220, 185, 198, 0.35);
      position: relative;
    }

    .ba-info-badges {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }

    .ba-pill-service {
      font-size: 0.74rem;
      font-weight: 700;
      color: var(--rose-primary);
      background: var(--bg-pill);
      padding: 4px 12px;
      border-radius: var(--radius-pill);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .ba-pill-verified {
      font-size: 0.72rem;
      font-weight: 700;
      color: #2E7D32;
      background: #E8F5E9;
      padding: 4px 10px;
      border-radius: var(--radius-pill);
    }

    .ba-info-title {
      font-family: var(--font-serif);
      font-size: 1.55rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 10px;
      line-height: 1.25;
    }

    .ba-info-desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 22px;
    }

    .ba-pricing-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 18px;
      background: rgba(250, 243, 245, 0.7);
      border-radius: var(--radius-md);
      margin-bottom: 22px;
      border: 1px dashed rgba(220, 185, 198, 0.6);
      direction: ltr;
    }

    html[dir="rtl"] .ba-pricing-box {
      direction: rtl;
    }

    .ba-price-group, .ba-duration-group {
      display: flex;
      flex-direction: column;
    }

    .ba-price-label, .ba-duration-label {
      font-size: 0.7rem;
      color: var(--text-light);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 2px;
    }

    .ba-price-amount {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--rose-primary);
    }

    .ba-duration-val {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-main);
    }

    .ba-protocol-points {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 26px;
    }

    .ba-protocol-points li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.86rem;
      color: var(--text-main);
      line-height: 1.45;
    }

    .ba-protocol-points .check-icon {
      color: var(--rose-primary);
      font-weight: 700;
      font-size: 0.95rem;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .ba-whatsapp-btn {
      width: 100%;
      padding: 14px 20px;
      border-radius: var(--radius-pill);
      background: var(--rose-btn);
      color: #FFFFFF;
      font-size: 0.95rem;
      font-weight: 700;
      box-shadow: var(--shadow-btn);
      transition: var(--transition);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      text-decoration: none;
    }

    .ba-whatsapp-btn:hover {
      background: var(--rose-btn-hover);
      box-shadow: 0 8px 24px rgba(206, 117, 145, 0.45);
      transform: translateY(-2px);
      color: #FFFFFF;
    }

    .ba-whatsapp-btn svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
      flex-shrink: 0;
    }

    .ba-guarantee-note {
      margin-top: 14px;
      font-size: 0.72rem;
      color: var(--text-light);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    @media (max-width: 992px) {
      .ba-container-layout {
        grid-template-columns: 1fr;
        gap: 28px;
      }
      .ba-slider-stage {
        max-width: 100%;
      }
      .ba-info-card {
        padding: 26px 20px;
      }
    }
`;

// Insert CSS right before "/* ============================================================ \n       SECTION: À PROPOS DE JOVEN"
html = html.replace('/* ============================================================\n       SECTION: À PROPOS DE JOVEN', cssToInject + '\n    /* ============================================================\n       SECTION: À PROPOS DE JOVEN');

// 2. Insert Nav Link in Desktop & Mobile
html = html.replace(
  '<li class="nav-item"><a href="#soins" data-i18n="nav_services">Nos Soins</a></li>',
  '<li class="nav-item"><a href="#soins" data-i18n="nav_services">Nos Soins</a></li>\n          <li class="nav-item"><a href="#avant-apres" data-i18n="nav_before_after">Avant / Après</a></li>'
);

html = html.replace(
  '<a href="#soins" onclick="closeDrawer()" data-i18n="nav_services">Nos Soins</a>',
  '<a href="#soins" onclick="closeDrawer()" data-i18n="nav_services">Nos Soins</a>\n    <a href="#avant-apres" onclick="closeDrawer()" data-i18n="nav_before_after">Avant / Après</a>'
);

// 3. Update Card 3 in #soins to feature authentic callus result image, 6000 DA, 2h
const oldCard3 = `        <!-- Card 3: Callus Peeling Signature (Authentic Pedicure Suite) -->
        <article class="soin-card" data-category="pieds" onclick="bookSpecificService('Callus Peeling Signature')">
          <div class="soin-media">
            <img src="/media/authentic/pedicure_station.jpg" alt="Espace Callus Peeling et Pédicure Médicale à JOVEN">
            <div class="soin-floating-icon" title="Callus Peeling">
              <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>
            </div>
          </div>
          <div class="soin-info">
            <div>
              <h3 class="soin-name" data-i18n="card_3_title">Callus Peeling Signature</h3>
              <p class="soin-desc" data-i18n="card_3_desc">Élimination intégrale des callosités pour une douceur absolue de bébé.</p>
            </div>
            <div class="soin-meta">
              <span class="soin-price">5 000 DA</span>
              <span class="soin-duration">⏱ 60 min</span>
            </div>
            <div class="soin-book-btn">
              <span>💬</span> <span data-i18n="btn_book_now">Réserver</span>
            </div>
          </div>
        </article>`;

const newCard3 = `        <!-- Card 3: Callus Peeling & Pédicure Profonde (Authentic Foot Result) -->
        <article class="soin-card" data-category="pieds" onclick="bookSpecificService('Callus Peeling — Pédicure Profonde')">
          <div class="soin-media">
            <img src="/media/comparison/callus_after.jpg" alt="Résultat réel Callus Peeling pieds doux à JOVEN Institut">
            <div class="soin-floating-icon" title="Callus Peeling">
              <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z"/></svg>
            </div>
          </div>
          <div class="soin-info">
            <div>
              <h3 class="soin-name" data-i18n="card_3_title">Callus Peeling — Pédicure Profonde</h3>
              <p class="soin-desc" data-i18n="card_3_desc">Soin complet de 2h : élimination intégrale des callosités et fissures, douceur absolue.</p>
            </div>
            <div class="soin-meta">
              <span class="soin-price">6 000 DA</span>
              <span class="soin-duration">⏱ 2h (120 min)</span>
            </div>
            <div class="soin-book-btn">
              <span>💬</span> <span data-i18n="btn_book_now">Réserver</span>
            </div>
          </div>
        </article>`;

html = html.replace(oldCard3, newCard3);

// 4. Insert the Before/After Comparison Section HTML right after </section> of #soins
const sectionHTML = `
  <!-- ============================================================
       SECTION: AVANT / APRÈS (Interactive Comparison Slider)
  ============================================================ -->
  <section class="comparison-section" id="avant-apres">
    <div class="container">
      <div class="section-header text-center">
        <div class="comparison-badge-tag">
          <span>✨</span> <span data-i18n="ba_badge">Résultats Visibles & Authentiques</span>
        </div>
        <h2 class="section-title" data-i18n="ba_title">Avant / Après • La Preuve en Image</h2>
        <p class="section-subtitle" data-i18n="ba_subtitle">Glissez le curseur interactif pour constater l'efficacité réelle de nos soins sur nos clientes</p>
      </div>

      <!-- Treatment Switcher Tabs -->
      <div class="ba-tabs" role="tablist">
        <button type="button" class="ba-tab active" data-treatment="callus" onclick="setComparisonTreatment('callus')">
          <span class="ba-tab-icon">🦶</span>
          <span class="ba-tab-title" data-i18n="ba_tab_callus">Callus Peeling</span>
          <span class="ba-tab-price">6 000 DA</span>
        </button>

        <button type="button" class="ba-tab" data-treatment="cils" onclick="setComparisonTreatment('cils')">
          <span class="ba-tab-icon">👁️</span>
          <span class="ba-tab-title" data-i18n="ba_tab_cils">Rehaussement Cils</span>
          <span class="ba-tab-price">6 000 DA</span>
        </button>

        <button type="button" class="ba-tab" data-treatment="hydra" onclick="setComparisonTreatment('hydra')">
          <span class="ba-tab-icon">✨</span>
          <span class="ba-tab-title" data-i18n="ba_tab_hydra">Hydrafacial Prestige</span>
          <span class="ba-tab-price">8 500 DA</span>
        </button>
      </div>

      <!-- Slider & Treatment Details Card Layout -->
      <div class="ba-container-layout">
        <!-- The Interactive Comparison Viewer -->
        <div class="ba-viewer-wrap" id="baViewer">
          <div class="ba-slider-stage" id="baStage" aria-label="Comparateur Avant Après">
            <!-- After Image (Background layer) -->
            <img src="/media/comparison/callus_after.jpg" id="baImgAfter" class="ba-img ba-img-after" alt="Après le soin" draggable="false">

            <!-- Before Image (Clipped layer) -->
            <img src="/media/comparison/callus_before.jpg" id="baImgBefore" class="ba-img ba-img-before" alt="Avant le soin" draggable="false">

            <!-- Floating Badges on Images -->
            <span class="ba-tag ba-tag-before" data-i18n="ba_label_before">Avant</span>
            <span class="ba-tag ba-tag-after" data-i18n="ba_label_after">Après</span>

            <!-- Draggable Divider Line & Knob Handle -->
            <div class="ba-handle" id="baHandle">
              <div class="ba-handle-line"></div>
              <div class="ba-handle-knob" aria-hidden="true">
                <svg viewBox="0 0 24 24" class="ba-handle-arrows">
                  <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                </svg>
              </div>
            </div>

            <!-- Range input for seamless touch & keyboard accessibility -->
            <input type="range" min="0" max="100" value="50" class="ba-range-input" id="baRangeInput" aria-label="Curseur de comparaison avant après">
          </div>
          <p class="ba-drag-hint">
            <span>⟵</span> <span data-i18n="ba_hint">Glissez le séparateur pour comparer</span> <span>⟶</span>
          </p>
        </div>

        <!-- Treatment Details & Booking Card -->
        <aside class="ba-info-card" id="baInfoCard">
          <div class="ba-info-header">
            <div class="ba-info-badges">
              <span class="ba-pill-service" id="baCardBadge" data-i18n="ba_card_callus_badge">Pédicure Médicale Russe</span>
              <span class="ba-pill-verified" title="Résultat authentique vérifié">✓ 100% Réel</span>
            </div>
            <h3 class="ba-info-title" id="baCardTitle" data-i18n="ba_card_callus_title">Callus Peeling — Pédicure Profonde</h3>
            <p class="ba-info-desc" id="baCardDesc" data-i18n="ba_card_callus_desc">
              Soin signature complet de 2h : bain relaxant bouillonnant, traitement kératolytique sans lames, ponceuse russe de haute précision et bain de paraffine nutritive pour des pieds doux comme ceux d'un nouveau-né dès la 1ère séance.
            </p>
          </div>

          <div class="ba-pricing-box">
            <div class="ba-price-group">
              <span class="ba-price-label" data-i18n="ba_tarif_label">Tarif officiel</span>
              <span class="ba-price-amount" id="baCardPrice">6 000 DA</span>
            </div>
            <div class="ba-duration-group">
              <span class="ba-duration-label" data-i18n="ba_duration_label">Durée de la séance</span>
              <span class="ba-duration-val" id="baCardDuration">⏱ 2 heures (120 min)</span>
            </div>
          </div>

          <ul class="ba-protocol-points" id="baCardPoints">
            <li><span class="check-icon">✓</span> <span data-i18n="ba_callus_pt1">100% indolore et sans bistouri (sécurité maximale)</span></li>
            <li><span class="check-icon">✓</span> <span data-i18n="ba_callus_pt2">Élimination des callosités, crevasses et rugosités</span></li>
            <li><span class="check-icon">✓</span> <span data-i18n="ba_callus_pt3">Ponceuse russe & hydratation intense longue durée</span></li>
            <li><span class="check-icon">✓</span> <span data-i18n="ba_callus_pt4">Résultat spectaculaire visible immédiatement</span></li>
          </ul>

          <a href="https://wa.me/213781088061?text=Bonjour%20JOVEN%2C%20je%20souhaite%20r%C3%A9server%20le%20soin%20Callus%20Peeling%20(6000%20DA)%20vu%20sur%20le%20site." 
             target="_blank" rel="noopener noreferrer" class="ba-whatsapp-btn" id="baWhatsAppBtn">
            <svg viewBox="0 0 24 24"><path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.44 5.71 1.44h.004c6.584 0 11.942-5.334 11.945-11.893 0-3.182-1.24-6.17-3.474-8.446zM12.045 21.785h-.003c-1.774 0-3.513-.476-5.031-1.37l-.361-.214-3.741.976.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.887 9.882zm5.425-7.403c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.149-.669.148-.198.298-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347z"/></svg>
            <span id="baCtaBtnText" data-i18n="ba_btn_book_result">Réserver ce résultat (6 000 DA)</span>
          </a>

          <div class="ba-guarantee-note">
            <span class="lock-icon">🔒</span> <span data-i18n="ba_guarantee_text">100% Réservé aux femmes • Institut privé à Hydra • Sur RDV</span>
          </div>
        </aside>
      </div>
    </div>
  </section>
`;

html = html.replace('  <!-- ============================================================\n       SECTION: À PROPOS DE JOVEN', sectionHTML + '\n  <!-- ============================================================\n       SECTION: À PROPOS DE JOVEN');

// 5. Update I18N dictionary for all 3 languages
const frAdditions = `
        nav_before_after: "Avant / Après",
        ba_badge: "Résultats Visibles & Authentiques",
        ba_title: "Avant / Après • La Preuve en Image",
        ba_subtitle: "Glissez le curseur interactif pour constater l'efficacité réelle de nos soins sur nos clientes",
        ba_tab_callus: "Callus Peeling",
        ba_tab_cils: "Rehaussement Cils",
        ba_tab_hydra: "Hydrafacial Prestige",
        ba_label_before: "Avant",
        ba_label_after: "Après",
        ba_hint: "Glissez le séparateur pour comparer",
        ba_tarif_label: "Tarif officiel",
        ba_duration_label: "Durée de la séance",
        ba_btn_book_result: "Réserver ce résultat",
        ba_guarantee_text: "100% Réservé aux femmes • Institut privé à Hydra • Sur RDV",
        ba_card_callus_badge: "Pédicure Médicale Russe",
        ba_card_callus_title: "Callus Peeling — Pédicure Profonde",
        ba_card_callus_desc: "Soin signature complet de 2h : bain relaxant bouillonnant, traitement kératolytique sans lames, ponceuse russe de haute précision et bain de paraffine nutritive pour des pieds doux comme ceux d'un nouveau-né dès la 1ère séance.",
        ba_callus_pt1: "100% indolore et sans bistouri (sécurité maximale)",
        ba_callus_pt2: "Élimination des callosités, crevasses et rugosités",
        ba_callus_pt3: "Ponceuse russe & hydratation intense longue durée",
        ba_callus_pt4: "Résultat spectaculaire visible immédiatement",
        ba_card_cils_badge: "Regard & Cils Naturels",
        ba_card_cils_title: "Rehaussement de Cils & Kératine",
        ba_card_cils_desc: "Sublimez la courbure de vos cils naturels sans faux-cils. Vos cils sont recourbés, gainés d'un soin à la kératine et intensifiés en noir pour un regard ouvert et radieux 24h/24.",
        ba_cils_pt1: "Regard agrandi et lumineux sans maquillage",
        ba_cils_pt2: "Tenue exceptionnelle de 6 à 8 semaines",
        ba_cils_pt3: "Soin fortifiant à la kératine pure",
        ba_cils_pt4: "Résiste à l'eau, à la douche et au sport",
        ba_card_hydra_badge: "Soin Visage Médical",
        ba_card_hydra_title: "Hydrafacial Prestige & Extraction",
        ba_card_hydra_desc: "Protocole médico-esthétique en 6 étapes : nettoyage vortex, peeling doux aux acides de fruits, extraction minutieuse des comédons/sébum et infusion d'antioxydants et d'acide hyaluronique pour un teint de verre éclatant.",
        ba_hydra_pt1: "Extraction indolore des points noirs et impuretés",
        ba_hydra_pt2: "Pores immédiatement resserrés et peau lissée",
        ba_hydra_pt3: "Infusion profonde d'acide hyaluronique & vitamines",
        ba_hydra_pt4: "Effet peau neuve éclatante dès la sortie de cabine",
`;

const arAdditions = `
        nav_before_after: "قبل وبعد",
        ba_badge: "نتائج حقيقية ملموسة من أول جلسة",
        ba_title: "قبل وبعد • الدليل بالصورة الحقيقية",
        ba_subtitle: "اسحبي المؤشر التفاعلي لمشاهدة الفرق المذهل والنتائج الحقيقية لزبوناتنا في الصالون",
        ba_tab_callus: "تقشير القدمين (Callus)",
        ba_tab_cils: "رفع الرموش (Lash Lift)",
        ba_tab_hydra: "هيدرافيشل بريستيج",
        ba_label_before: "قبل",
        ba_label_after: "بعد",
        ba_hint: "اسحبي الفاصل يميناً ويساراً للمقارنة",
        ba_tarif_label: "السعر الرسمي المعتمد",
        ba_duration_label: "مدة الجلسة الكاملة",
        ba_btn_book_result: "حجز هذه النتيجة المؤكدة",
        ba_guarantee_text: "100% نسائي بالكامل • معهد خاص بحيدرة • الحجز مسبقاً",
        ba_card_callus_badge: "بديكير طبي روسي فاخر",
        ba_card_callus_title: "تقشير القدمين الحصري (Callus Peeling)",
        ba_card_callus_desc: "جلسة توقيعية كاملة لمدة ساعتين (2h) تشمل: حمام فقاعات استرخائي، تركيبة تقشير كيراتينية بدون شفرات، صقل مجهري بجهاز البوديكير الروسي وترطيب مكثف بالبرافين لاستعادة نعومة أقدام الأطفال من أول جلسة.",
        ba_callus_pt1: "بدون ألم وبدون شفرات حادة (أمان طبي 100%)",
        ba_callus_pt2: "تخلص نهائي من التشققات والجلد الخشن المتراكم",
        ba_callus_pt3: "صقل روسي متقن وترطيب علاجي عميق يدوم طويلاً",
        ba_callus_pt4: "نتيجة فورية ملموسة ومبهرة من أول زيارة",
        ba_card_cils_badge: "جمال وسحر العيون",
        ba_card_cils_title: "رفع وتغذية الرموش بالكيراتين (Lash Lift)",
        ba_card_cils_desc: "إبراز طول وكثافة رموشكِ الطبيعية دون الحاجة لرموش اصطناعية أو ماسكارا. رفع وتقويس جذاب مع صبغ أسود مكثف وحمام كيراتين معالج لعيون ساحرة ومفتوحة طوال اليوم.",
        ba_cils_pt1: "عيون واسعة وجذابة بدون الحاجة لماسكارا يومية",
        ba_cils_pt2: "ثبات طويل الأمد يدوم من 6 إلى 8 أسابيع",
        ba_cils_pt3: "تغذية علاجية مكثفة بألياف الكيراتين النقي",
        ba_cils_pt4: "مقاوم للماء والاستحمام ولا يضر الرموش الطبيعية",
        ba_card_hydra_badge: "علاج طبي متقدم للبشرة",
        ba_card_hydra_title: "جلسة الهيدرافيشل بريستيج وتنقية المسام",
        ba_card_hydra_desc: "بروتوكول تجميلي طبيعي متكامل في 6 مراحل: تقشير بالدوامة المائية، تنظيف لطيف بأحماض الفواكه، شفط عميق للرؤوس السوداء والبيضاء والدهون، وحقن سيرومات حمض الهيالورونيك ومضادات الأكسدة لنضارة زجاجية فورية.",
        ba_hydra_pt1: "شفط عميق وغير مؤلم للرؤوس السوداء والدهون المتراكمة",
        ba_hydra_pt2: "تضييق فوري للمسام وتنعيم متكامل لملمس البشرة",
        ba_hydra_pt3: "تغذية عميقة بمضادات الأكسدة وحمض الهيالورونيك",
        ba_hydra_pt4: "نضارة وإشراقة زجاجية فورية تلاحظينها عند الخروج",
`;

const enAdditions = `
        nav_before_after: "Before / After",
        ba_badge: "Visible & Authentic Results",
        ba_title: "Before & After • Real Proof in Photos",
        ba_subtitle: "Drag the interactive slider to experience the authentic transformation of our salon clients",
        ba_tab_callus: "Callus Peeling",
        ba_tab_cils: "Lash Lift",
        ba_tab_hydra: "Hydrafacial Prestige",
        ba_label_before: "Before",
        ba_label_after: "After",
        ba_hint: "Drag the divider to compare",
        ba_tarif_label: "Official Rate",
        ba_duration_label: "Session Duration",
        ba_btn_book_result: "Book This Result",
        ba_guarantee_text: "100% Women-Only • Private Institute in Hydra • By Appointment",
        ba_card_callus_badge: "Medical Russian Pedicure",
        ba_card_callus_title: "Signature Callus Peeling — Deep Pedicure",
        ba_card_callus_desc: "Comprehensive 2-hour signature ritual: relaxing bubble bath, blade-free keratolytic peeling, high-precision Russian sanding and deep paraffin hydration for pure baby-soft feet from the very first session.",
        ba_callus_pt1: "100% painless and blade-free (maximum clinical safety)",
        ba_callus_pt2: "Complete eradication of rough calluses, cracks and dry skin",
        ba_callus_pt3: "Russian precision milling & long-lasting deep hydration",
        ba_callus_pt4: "Immediate, visible and breathtaking transformation",
        ba_card_cils_badge: "Natural Eye Radiance",
        ba_card_cils_title: "Keratin Lash Lift & Tint",
        ba_card_cils_desc: "Elevate your natural lashes without extensions. Curled from the root, nourished with pure keratin and tinted in deep rich black for an effortlessly awake and stunning gaze 24/7.",
        ba_cils_pt1: "Bright, wide-awake gaze with zero daily mascara",
        ba_cils_pt2: "Long-lasting results holding 6 to 8 weeks",
        ba_cils_pt3: "Deeply fortifying pure keratin infusion",
        ba_cils_pt4: "Waterproof, gym-proof and completely gentle on lashes",
        ba_card_hydra_badge: "Advanced Medical Facial",
        ba_card_hydra_title: "Hydrafacial Prestige & Deep Extraction",
        ba_card_hydra_desc: "6-step medical aesthetic protocol: vortex cleansing, gentle fruit acid peeling, painless blackhead and sebum extraction, and deep infusion of hyaluronic acid and antioxidants for an undeniable glass-skin glow.",
        ba_hydra_pt1: "Painless vacuum extraction of blackheads & impurities",
        ba_hydra_pt2: "Instantly refined pores and smoothed skin texture",
        ba_hydra_pt3: "Deep infusion of hyaluronic acid & vital antioxidants",
        ba_hydra_pt4: "Instant radiant glass skin straight out of the cabin",
`;

html = html.replace('modal_btn_confirm: "Confirmer via WhatsApp"', 'modal_btn_confirm: "Confirmer via WhatsApp",' + frAdditions);
html = html.replace('modal_btn_confirm: "إرسال الحجز عبر الواتساب"', 'modal_btn_confirm: "إرسال الحجز عبر الواتساب",' + arAdditions);
html = html.replace('modal_btn_confirm: "Confirm via WhatsApp"', 'modal_btn_confirm: "Confirm via WhatsApp",' + enAdditions);

// 6. Insert JavaScript Logic for Comparison Slider and Switcher
const jsLogic = `
    /* ==========================================================
       BEFORE / AFTER COMPARISON SLIDER LOGIC
    ========================================================== */
    const TREATMENTS_DATA = {
      callus: {
        beforeImg: '/media/comparison/callus_before.jpg',
        afterImg: '/media/comparison/callus_after.jpg',
        price: '6 000 DA',
        duration: { fr: '⏱ 2 heures (120 min)', ar: '⏱ ساعتان (120 دقيقة)', en: '⏱ 2 hours (120 min)' },
        badgeKey: 'ba_card_callus_badge',
        titleKey: 'ba_card_callus_title',
        descKey: 'ba_card_callus_desc',
        points: ['ba_callus_pt1', 'ba_callus_pt2', 'ba_callus_pt3', 'ba_callus_pt4'],
        waMsg: {
          fr: 'Bonjour JOVEN, je souhaite réserver le soin Callus Peeling (6 000 DA) pour retrouver des pieds tout doux.',
          ar: 'مرحبا معهد JOVEN، أود حجز جلسة تقشير القدمين Callus Peeling (6000 دج) لتنعيم القدمين والتخلص من التشققات.',
          en: 'Hello JOVEN, I would like to book the Callus Peeling treatment (6,000 DA).'
        }
      },
      cils: {
        beforeImg: '/media/comparison/cils_before.jpg',
        afterImg: '/media/comparison/cils_after.jpg',
        price: '6 000 DA',
        duration: { fr: '⏱ 60 min', ar: '⏱ 60 دقيقة (ساعة)', en: '⏱ 60 min' },
        badgeKey: 'ba_card_cils_badge',
        titleKey: 'ba_card_cils_title',
        descKey: 'ba_card_cils_desc',
        points: ['ba_cils_pt1', 'ba_cils_pt2', 'ba_cils_pt3', 'ba_cils_pt4'],
        waMsg: {
          fr: 'Bonjour JOVEN, je souhaite réserver le Rehaussement de Cils & Kératine (6 000 DA).',
          ar: 'مرحبا معهد JOVEN، أود حجز جلسة رفع الرموش بالكيراتين Lash Lift (6000 دج).',
          en: 'Hello JOVEN, I would like to book the Keratin Lash Lift treatment (6,000 DA).'
        }
      },
      hydra: {
        beforeImg: '/media/comparison/hydra_before.jpg',
        afterImg: '/media/comparison/hydra_after.jpg',
        price: '8 500 DA',
        duration: { fr: '⏱ 90 min (1h30)', ar: '⏱ 90 دقيقة (ساعة ونصف)', en: '⏱ 90 min (1h30)' },
        badgeKey: 'ba_card_hydra_badge',
        titleKey: 'ba_card_hydra_title',
        descKey: 'ba_card_hydra_desc',
        points: ['ba_hydra_pt1', 'ba_hydra_pt2', 'ba_hydra_pt3', 'ba_hydra_pt4'],
        waMsg: {
          fr: 'Bonjour JOVEN, je souhaite réserver le soin Hydrafacial Prestige (8 500 DA) pour nettoyer et illuminer ma peau.',
          ar: 'مرحبا معهد JOVEN، أود حجز جلسة الهيدرافيشل بريستيج (8500 دج) لتنقية البشرة وإزالة الرؤوس السوداء.',
          en: 'Hello JOVEN, I would like to book the Hydrafacial Prestige treatment (8,500 DA).'
        }
      }
    };

    let activeTreatment = 'callus';

    function setComparisonTreatment(key) {
      if (!TREATMENTS_DATA[key]) return;
      activeTreatment = key;

      // Update tabs UI
      document.querySelectorAll('.ba-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-treatment') === key);
      });

      const data = TREATMENTS_DATA[key];
      const stage = document.getElementById('baStage');
      const imgBefore = document.getElementById('baImgBefore');
      const imgAfter = document.getElementById('baImgAfter');

      // Update images
      imgBefore.src = data.beforeImg;
      imgAfter.src = data.afterImg;

      // Reset split to 50%
      updateSliderPosition(50);
      const range = document.getElementById('baRangeInput');
      if (range) range.value = 50;

      // Update Card details
      updateComparisonCardTexts();
    }

    function updateComparisonCardTexts() {
      const data = TREATMENTS_DATA[activeTreatment];
      if (!data) return;
      const dict = I18N[currentLang] || I18N.fr;

      const badge = document.getElementById('baCardBadge');
      const title = document.getElementById('baCardTitle');
      const desc = document.getElementById('baCardDesc');
      const price = document.getElementById('baCardPrice');
      const duration = document.getElementById('baCardDuration');
      const cta = document.getElementById('baCtaBtnText');
      const btn = document.getElementById('baWhatsAppBtn');

      if (badge && dict[data.badgeKey]) badge.textContent = dict[data.badgeKey];
      if (title && dict[data.titleKey]) title.textContent = dict[data.titleKey];
      if (desc && dict[data.descKey]) desc.textContent = dict[data.descKey];
      if (price) price.textContent = data.price;
      if (duration && data.duration[currentLang]) duration.textContent = data.duration[currentLang];
      if (cta) cta.textContent = (dict.ba_btn_book_result || 'Réserver ce résultat') + ' (' + data.price + ')';

      const pointsContainer = document.getElementById('baCardPoints');
      if (pointsContainer && data.points) {
        pointsContainer.innerHTML = data.points.map(ptKey => \`
          <li><span class="check-icon">✓</span> <span>\${dict[ptKey] || ''}</span></li>
        \`).join('');
      }

      if (btn) {
        const msg = data.waMsg[currentLang] || data.waMsg.fr;
        btn.href = 'https://wa.me/213781088061?text=' + encodeURIComponent(msg);
      }
    }

    // Interactive Drag / Touch Slider Handler
    function updateSliderPosition(percent) {
      const stage = document.getElementById('baStage');
      if (!stage) return;
      const clamped = Math.max(0, Math.min(100, percent));
      stage.style.setProperty('--split', clamped + '%');
    }

    function initComparisonSlider() {
      const stage = document.getElementById('baStage');
      const range = document.getElementById('baRangeInput');
      if (!stage) return;

      let isDragging = false;

      function getPercentageFromEvent(e) {
        const rect = stage.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const isRtl = document.documentElement.dir === 'rtl';

        let p;
        if (isRtl) {
          p = ((rect.right - clientX) / rect.width) * 100;
        } else {
          p = ((clientX - rect.left) / rect.width) * 100;
        }
        return Math.max(0, Math.min(100, p));
      }

      function onMove(e) {
        if (!isDragging) return;
        const p = getPercentageFromEvent(e);
        updateSliderPosition(p);
        if (range) range.value = p;
      }

      function onEnd() {
        isDragging = false;
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onEnd);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onEnd);
      }

      stage.addEventListener('mousedown', (e) => {
        isDragging = true;
        const p = getPercentageFromEvent(e);
        updateSliderPosition(p);
        if (range) range.value = p;
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);
      });

      stage.addEventListener('touchstart', (e) => {
        isDragging = true;
        const p = getPercentageFromEvent(e);
        updateSliderPosition(p);
        if (range) range.value = p;
        window.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('touchend', onEnd);
      }, { passive: true });

      if (range) {
        range.addEventListener('input', (e) => {
          updateSliderPosition(parseFloat(e.target.value));
        });
      }
    }

    // Call init on DOM load
    document.addEventListener('DOMContentLoaded', () => {
      initComparisonSlider();
      updateComparisonCardTexts();
    });
`;

// Insert the JS logic right before the closing </script>
html = html.replace('// Initialize Language\n    switchLanguage(currentLang);', '// Initialize Language\n    switchLanguage(currentLang);\n' + jsLogic);

// Also hook updateComparisonCardTexts into switchLanguage so switching lang updates the comparison card
html = html.replace(
  '// Update text nodes\n      const dict = I18N[lang];',
  '// Update comparison card\n      if (typeof updateComparisonCardTexts === "function") updateComparisonCardTexts();\n\n      // Update text nodes\n      const dict = I18N[lang];'
);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully injected Before/After Comparison section into index.html');
