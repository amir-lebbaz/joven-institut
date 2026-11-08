const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Replace card images with clean authentic paths
html = html.replace('/media/authentic/skin_devices.jpg', '/media/authentic/hydrafacial_treatment.jpg');
html = html.replace('/media/authentic/nails_colors.jpg', '/media/authentic/nails_biab.jpg');
html = html.replace('/media/authentic/pedicure_chair.jpg', '/media/authentic/pedicure_station.jpg');
html = html.replace('/media/authentic/skin_products.jpg', '/media/authentic/shiny_hair.jpg');

// Replace about images
html = html.replace('/media/authentic/salon_interior_2.jpg', '/media/authentic/salon_lounge_interior.jpg');
html = html.replace('/media/authentic/facade.jpg', '/media/authentic/facade_exterior.jpg');

// Replace gallery images
html = html.replace('/media/authentic/lash_lift_before_after.jpg', '/media/authentic/lash_lift.jpg');
html = html.replace('/media/authentic/pedicure_chair.jpg', '/media/authentic/pedicure_station.jpg');
html = html.replace('/media/authentic/skin_products.jpg', '/media/authentic/sothys_products.jpg');
html = html.replace('/media/authentic/salon_interior_3.jpg', '/media/authentic/insta_work_1.jpg');

// Replace facade in contact
html = html.replace('src="/media/authentic/facade.jpg"', 'src="/media/authentic/street_hydra.jpg"');

// Fix soin-meta direction
html = html.replace('.soin-meta {', '.soin-meta {\n      direction: ltr;');

fs.writeFileSync('public/index.html', html, 'utf8');
console.log('Updated index.html with clean authentic paths!');
