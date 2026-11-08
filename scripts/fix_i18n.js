const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Fix the nested fr: {
html = html.replace(`const I18N = {
    fr: {
      offers_pill: "Édition Limitée",
      offers_title: "Forfaits & Offres Spéciales",
      offers_subtitle: "Profitez de nos formules signatures combinant soins d'exception et tarifs avantageux.",
      btn_book_offer: "Réserver cette offre sur WhatsApp",
      fr: {`, `const I18N = {
      fr: {
        offers_pill: "Édition Limitée",
        offers_title: "Forfaits & Offres Spéciales",
        offers_subtitle: "Profitez de nos formules signatures combinant soins d'exception et tarifs avantageux.",
        btn_book_offer: "Réserver cette offre sur WhatsApp",`);

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Fixed I18N nesting!');
