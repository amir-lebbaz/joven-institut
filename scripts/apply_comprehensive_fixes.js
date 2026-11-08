const fs = require('fs');

console.log('Applying comprehensive fixes to public/index.html...');
let html = fs.readFileSync('public/index.html', 'utf8');

// 1. Fix modalImageViewer empty src
html = html.replace(
  '<img id="modalImageViewer" src="" alt="" style="width:100%; border-radius:var(--radius-md);">',
  '<img id="modalImageViewer" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'%3E%3C/svg%3E" alt="Aperçu photo" style="width:100%; border-radius:var(--radius-md);">'
);

// In closeImageModal:
html = html.replace(
  'modalImageViewer.src = \'\';',
  'modalImageViewer.src = "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'%3E%3C/svg%3E";'
);

// 2. Fix updateServiceDropdown() element id
html = html.replace(
  "const select = document.getElementById('serviceSelect');",
  "const select = document.getElementById('selectedService');"
);

// 3. Fix filterServices(category) function to handle dynamic & static cards
const oldFilterServices = `    function filterServices(category) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      const activeBtn = Array.from(document.querySelectorAll('.filter-btn')).find(b => b.getAttribute('onclick').includes(category));
      if (activeBtn) activeBtn.classList.add('active');

      const cards = document.querySelectorAll('.soin-card');
      cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    }`;

const newFilterServices = `    function filterServices(category) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      const activeBtn = Array.from(document.querySelectorAll('.filter-btn')).find(b => {
        const oc = b.getAttribute('onclick') || '';
        return oc.includes("'" + category + "'");
      });
      if (activeBtn) activeBtn.classList.add('active');

      if (window.DYNAMIC_SERVICES && window.DYNAMIC_SERVICES.length > 0) {
        renderSupabaseServices(category);
      } else {
        const cards = document.querySelectorAll('.soin-card');
        cards.forEach(card => {
          const cardCat = (card.getAttribute('data-category') || '').toLowerCase();
          let match = (category === 'all');
          if (category === 'visage') match = cardCat.includes('visage');
          if (category === 'pieds') match = cardCat.includes('pied') || cardCat.includes('callus');
          if (category === 'ongles') match = cardCat.includes('ongle') || cardCat.includes('main') || cardCat.includes('cils') || cardCat.includes('regard');
          if (category === 'cheveux') match = cardCat.includes('cheveu') || cardCat.includes('capill') || cardCat.includes('spa');

          if (match) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.display = 'none';
          }
        });
      }
    }`;

if (html.includes(oldFilterServices)) {
  html = html.replace(oldFilterServices, newFilterServices);
  console.log('Fixed filterServices implementation.');
} else {
  console.warn('Could not find oldFilterServices, attempting pattern match...');
  const fnIdx = html.indexOf('function filterServices(');
  if (fnIdx !== -1) {
    const fnEnd = html.indexOf('}', html.indexOf('card.style.display = \'none\';', fnIdx));
    if (fnEnd !== -1) {
      const closingBrace = html.indexOf('}', fnEnd + 1);
      html = html.slice(0, fnIdx) + newFilterServices.trim() + html.slice(closingBrace + 1);
      console.log('Replaced filterServices by index.');
    }
  }
}

// 4. In submitBooking(e), use dynamic WhatsApp number
const oldSubmitBookingWa = "const waUrl = `https://wa.me/213781088061?text=${encodeURIComponent(msg)}`;";
const newSubmitBookingWa = "const waPhone = (window.SALON_WHATSAPP || '213781088061').replace(/[^0-9]/g, '');\n      const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`;";

if (html.includes(oldSubmitBookingWa)) {
  html = html.replace(oldSubmitBookingWa, newSubmitBookingWa);
  console.log('Made WhatsApp URL dynamic in submitBooking.');
}

// 5. In syncSalonConfigLive(), store window.SALON_WHATSAPP
const oldSyncWa = "if (configMap.whatsapp_number) {\n          const waNum = configMap.whatsapp_number.replace(/[^0-9]/g, '');";
const newSyncWa = "if (configMap.whatsapp_number) {\n          const waNum = configMap.whatsapp_number.replace(/[^0-9]/g, '');\n          window.SALON_WHATSAPP = waNum;";

if (html.includes(oldSyncWa)) {
  html = html.replace(oldSyncWa, newSyncWa);
  console.log('Updated window.SALON_WHATSAPP in syncSalonConfigLive.');
}

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Comprehensive fixes applied to public/index.html successfully.');
