const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const imgMatches = [...html.matchAll(/<img[^>]*>/gi)];
console.log('Total img tags in HTML:', imgMatches.length);

imgMatches.forEach((m, idx) => {
  const tag = m[0];
  const src = tag.match(/src="([^"]*)"/i) || tag.match(/src='([^']*)'/i);
  if (!src || !src[1] || src[1].trim() === '' || src[1] === '/') {
    console.log(`Image #${idx} has empty or root src:`, tag);
  }
});
