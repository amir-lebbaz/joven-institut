const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

html = html.replace('<strong>100% Féminin & Privatisé</strong>', '<strong data-i18n="hero_stat_title">100% Féminin & Privatisé</strong>');

html = html.replace('hero_stat_sub: "Cadre haut standing à Hydra",', 'hero_stat_title: "100% Féminin & Privatisé",\n      hero_stat_sub: "Cadre haut standing à Hydra",');
html = html.replace('hero_stat_sub: "أجواء راقية وخاصة في حيدرة",', 'hero_stat_title: "100% نسائي وخاص بالكامل",\n      hero_stat_sub: "أجواء راقية وخاصة في حيدرة",');
html = html.replace('hero_stat_sub: "Luxury private haven in Hydra",', 'hero_stat_title: "100% Women & Private Haven",\n      hero_stat_sub: "Luxury private haven in Hydra",');

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Added hero_stat_title translation!');
