const fs = require('fs');
if (fs.existsSync('reels_metadata.json')) {
  const metadata = JSON.parse(fs.readFileSync('reels_metadata.json', 'utf8'));
  console.log('Reels count:', metadata.length || Object.keys(metadata).length);
  const items = Array.isArray(metadata) ? metadata : Object.values(metadata);
  items.forEach((item, idx) => {
    console.log(`Reel ${idx}:`, item.title || item.caption || item.filename || item);
  });
} else {
  console.log('reels_metadata.json not found');
}
