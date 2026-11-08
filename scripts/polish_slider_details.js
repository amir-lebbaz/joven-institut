const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'public', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Update TREATMENTS_DATA to have language-specific price
const oldTreatments = `    const TREATMENTS_DATA = {
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
    };`;

const newTreatments = `    const TREATMENTS_DATA = {
      callus: {
        beforeImg: '/media/comparison/callus_before.jpg',
        afterImg: '/media/comparison/callus_after.jpg',
        prices: { fr: '6 000 DA', ar: '6 000 دج', en: '6,000 DA' },
        duration: { fr: '⏱ 2 heures (120 min)', ar: '⏱ ساعتان (120 دقيقة)', en: '⏱ 2 hours (120 min)' },
        badgeKey: 'ba_card_callus_badge',
        titleKey: 'ba_card_callus_title',
        descKey: 'ba_card_callus_desc',
        points: ['ba_callus_pt1', 'ba_callus_pt2', 'ba_callus_pt3', 'ba_callus_pt4'],
        waMsg: {
          fr: 'Bonjour JOVEN, je souhaite réserver le soin Callus Peeling (6 000 DA) pour retrouver des pieds tout doux.',
          ar: 'مرحبا معهد JOVEN، أود حجز جلسة تقشير القدمين Callus Peeling (6 000 دج) لتنعيم القدمين والتخلص من التشققات.',
          en: 'Hello JOVEN, I would like to book the Callus Peeling treatment (6,000 DA).'
        }
      },
      cils: {
        beforeImg: '/media/comparison/cils_before.jpg',
        afterImg: '/media/comparison/cils_after.jpg',
        prices: { fr: '6 000 DA', ar: '6 000 دج', en: '6,000 DA' },
        duration: { fr: '⏱ 60 min', ar: '⏱ 60 دقيقة (ساعة)', en: '⏱ 60 min' },
        badgeKey: 'ba_card_cils_badge',
        titleKey: 'ba_card_cils_title',
        descKey: 'ba_card_cils_desc',
        points: ['ba_cils_pt1', 'ba_cils_pt2', 'ba_cils_pt3', 'ba_cils_pt4'],
        waMsg: {
          fr: 'Bonjour JOVEN, je souhaite réserver le Rehaussement de Cils & Kératine (6 000 DA).',
          ar: 'مرحبا معهد JOVEN، أود حجز جلسة رفع الرموش بالكيراتين Lash Lift (6 000 دج).',
          en: 'Hello JOVEN, I would like to book the Keratin Lash Lift treatment (6,000 DA).'
        }
      },
      hydra: {
        beforeImg: '/media/comparison/hydra_before.jpg',
        afterImg: '/media/comparison/hydra_after.jpg',
        prices: { fr: '8 500 DA', ar: '8 500 دج', en: '8,500 DA' },
        duration: { fr: '⏱ 90 min (1h30)', ar: '⏱ 90 دقيقة (ساعة ونصف)', en: '⏱ 90 min (1h30)' },
        badgeKey: 'ba_card_hydra_badge',
        titleKey: 'ba_card_hydra_title',
        descKey: 'ba_card_hydra_desc',
        points: ['ba_hydra_pt1', 'ba_hydra_pt2', 'ba_hydra_pt3', 'ba_hydra_pt4'],
        waMsg: {
          fr: 'Bonjour JOVEN, je souhaite réserver le soin Hydrafacial Prestige (8 500 DA) pour nettoyer et illuminer ma peau.',
          ar: 'مرحبا معهد JOVEN، أود حجز جلسة الهيدرافيشل بريستيج (8 500 دج) لتنقية البشرة وإزالة الرؤوس السوداء.',
          en: 'Hello JOVEN, I would like to book the Hydrafacial Prestige treatment (8,500 DA).'
        }
      }
    };`;

html = html.replace(oldTreatments, newTreatments);

// 2. Update updateComparisonCardTexts to handle prices properly and update tab prices
const oldUpdateCard = `    function updateComparisonCardTexts() {
      if (typeof TREATMENTS_DATA === 'undefined') return;
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
      if (cta) cta.textContent = (dict.ba_btn_book_result || 'Réserver ce résultat') + ' (' + data.price + ')';`;

const newUpdateCard = `    function updateComparisonCardTexts() {
      if (typeof TREATMENTS_DATA === 'undefined') return;
      const data = TREATMENTS_DATA[activeTreatment];
      if (!data) return;
      const dict = I18N[currentLang] || I18N.fr;

      // Update tab prices
      const tabCallusPrice = document.getElementById('baTabCallusPrice');
      const tabCilsPrice = document.getElementById('baTabCilsPrice');
      const tabHydraPrice = document.getElementById('baTabHydraPrice');
      if (tabCallusPrice) tabCallusPrice.textContent = TREATMENTS_DATA.callus.prices[currentLang] || TREATMENTS_DATA.callus.prices.fr;
      if (tabCilsPrice) tabCilsPrice.textContent = TREATMENTS_DATA.cils.prices[currentLang] || TREATMENTS_DATA.cils.prices.fr;
      if (tabHydraPrice) tabHydraPrice.textContent = TREATMENTS_DATA.hydra.prices[currentLang] || TREATMENTS_DATA.hydra.prices.fr;

      const currentPrice = data.prices[currentLang] || data.prices.fr;
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
      if (price) price.textContent = currentPrice;
      if (duration && data.duration[currentLang]) duration.textContent = data.duration[currentLang];
      if (cta) cta.textContent = (dict.ba_btn_book_result || 'Réserver ce résultat') + ' (' + currentPrice + ')';`;

html = html.replace(oldUpdateCard, newUpdateCard);

// 3. Add IDs to the tab price tags in HTML
html = html.replace(
  '<span class="ba-tab-price">6 000 DA</span>\n        </button>\n\n        <button type="button" class="ba-tab" data-treatment="cils"',
  '<span class="ba-tab-price" id="baTabCallusPrice">6 000 DA</span>\n        </button>\n\n        <button type="button" class="ba-tab" data-treatment="cils"'
);

html = html.replace(
  '<span class="ba-tab-price">6 000 DA</span>\n        </button>\n\n        <button type="button" class="ba-tab" data-treatment="hydra"',
  '<span class="ba-tab-price" id="baTabCilsPrice">6 000 DA</span>\n        </button>\n\n        <button type="button" class="ba-tab" data-treatment="hydra"'
);

html = html.replace(
  '<span class="ba-tab-price">8 500 DA</span>\n        </button>\n      </div>',
  '<span class="ba-tab-price" id="baTabHydraPrice">8 500 DA</span>\n        </button>\n      </div>'
);

// 4. Update Arabic Title and text for Callus
html = html.replace(
  'ba_card_callus_title: "تقشير القدمين الحصري (Callus Peeling)",',
  'ba_card_callus_title: "تقشير القدمين الحصري • Callus Peeling",'
);

// 5. Update Card 2 in "Nos Soins" to use real nail photo
html = html.replace(
  '<img src="/media/authentic/nails_biab.jpg" alt="Collection d\'ongles et vernis à JOVEN Institut">',
  '<img src="/media/gmaps_sample/Photo_11.jpg" alt="Pose d\'ongles et manucure russe de précision à JOVEN Institut">'
);

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully polished Arabic currency and tab prices!');
