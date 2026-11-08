const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const idx = html.indexOf('video_welcome.mp4');
console.log('Index of video_welcome.mp4:', idx);
console.log(html.slice(Math.max(0, idx - 400), Math.min(html.length, idx + 400)));
