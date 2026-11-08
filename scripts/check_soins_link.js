const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');

// Check mobile drawer / menu
const mobileMenuIdx = html.indexOf('mobile-menu') !== -1 ? html.indexOf('mobile-menu') : html.indexOf('mobile-nav');
console.log('mobile menu idx:', mobileMenuIdx);
if (mobileMenuIdx !== -1) {
  console.log(html.slice(mobileMenuIdx - 200, mobileMenuIdx + 800));
}

// Check hamburger button
const burgerIdx = html.indexOf('hamburger') !== -1 ? html.indexOf('hamburger') : html.indexOf('menu-toggle');
console.log('burger idx:', burgerIdx);
if (burgerIdx !== -1) {
  console.log(html.slice(burgerIdx - 100, burgerIdx + 400));
}

// Check all links with href="#soins"
const soinsLinks = [...html.matchAll(/<a[^>]*href=["']#soins["'][^>]*>([\s\S]*?)<\/a>/gi)];
console.log('Links to #soins count:', soinsLinks.length);
soinsLinks.forEach((l, i) => console.log(`Link ${i}:`, l[0]));

// Check where id="soins" is defined
const idSoins = html.indexOf('id="soins"');
console.log('id="soins" context:', html.slice(idSoins - 50, idSoins + 150));
