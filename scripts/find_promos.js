const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const promoMatches = [...html.matchAll(/(promo|offre|pack|special)/gi)].map(m => m.index);
console.log('Occurrences count:', promoMatches.length);
if (promoMatches.length > 0) {
  for (let i = 0; i < Math.min(5, promoMatches.length); i++) {
    const idx = promoMatches[i];
    console.log(`-- match ${i}:`, html.slice(Math.max(0, idx - 50), Math.min(html.length, idx + 100)));
  }
}
