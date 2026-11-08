const fs = require('fs');
const metadata = JSON.parse(fs.readFileSync('reels_metadata.json', 'utf8'));
const items = Array.isArray(metadata) ? metadata : Object.values(metadata);
items.forEach((item, idx) => {
  console.log(`--- Reel ${idx} ---`);
  console.log('Shortcode:', item.shortcode || item.id);
  console.log('Text:', (item.text || item.caption || item.description || '').slice(0, 150));
});
