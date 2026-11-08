const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

const heroStart = html.indexOf('class="hero-media');
console.log(html.slice(heroStart - 100, heroStart + 800));
