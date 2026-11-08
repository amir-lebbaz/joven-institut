const fs = require('fs');
const html = fs.readFileSync('public/admin.html', 'utf8');

const funcs = ['deleteService', 'deleteOffer', 'deleteGalleryItem', 'saveOffer', 'saveGallery', 'saveService'];
funcs.forEach(f => {
  const idx = html.indexOf(f);
  console.log(`\n================== ${f} ==================`);
  if (idx !== -1) {
    console.log(html.slice(idx - 20, idx + 450));
  } else {
    console.log('Not found');
  }
});
