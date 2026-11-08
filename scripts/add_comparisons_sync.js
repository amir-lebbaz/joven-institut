const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

const marker = `        // Update WhatsApp links
        if (configMap.whatsapp_number) {
          const waNum = configMap.whatsapp_number.replace(/[^0-9]/g, '');
          document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            const currentHref = link.getAttribute('href');
            link.setAttribute('href', currentHref.replace(/wa\\.me\\/\\d+/, 'wa.me/' + waNum));
          });
        }`;

const enhanced = `        // Update WhatsApp links
        if (configMap.whatsapp_number) {
          const waNum = configMap.whatsapp_number.replace(/[^0-9]/g, '');
          document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            const currentHref = link.getAttribute('href');
            link.setAttribute('href', currentHref.replace(/wa\\.me\\/\\d+/, 'wa.me/' + waNum));
          });
        }

        // Sync Comparisons from Supabase
        const { data: compRows } = await supabaseClient.from('comparisons').select('*');
        if (compRows && compRows.length > 0) {
          compRows.forEach(c => {
            const key = c.service_key === 'hydrafacial' ? 'hydra' : c.service_key;
            if (typeof TREATMENTS_DATA !== 'undefined' && TREATMENTS_DATA[key]) {
              if (c.before_image) TREATMENTS_DATA[key].beforeImg = c.before_image;
              if (c.after_image) TREATMENTS_DATA[key].afterImg = c.after_image;
            }
          });
          if (typeof setComparisonTreatment === 'function' && typeof activeTreatment !== 'undefined') {
            setComparisonTreatment(activeTreatment);
          }
        }`;

if (html.includes(marker)) {
  html = html.replace(marker, enhanced);
  fs.writeFileSync('public/index.html', html, 'utf8');
  console.log('Added comparisons sync to index.html!');
} else {
  console.warn('Could not find marker for comparisons sync.');
}
