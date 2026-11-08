const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const mp4Matches = [...html.matchAll(/["']([^"']+\.mp4)["']/gi)].map(m => m[1]);
console.log('MP4 references in index.html:', mp4Matches);
