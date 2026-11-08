const fs = require('fs');
const path = require('path');

const gmapsDir = 'C:\\Users\\amir\\OneDrive\\Desktop\\صالون\\02_Google_Maps\\01_الصور_العامة_Photos';
const instaPostsDir = 'C:\\Users\\amir\\OneDrive\\Desktop\\صالون\\01_Instagram\\02_Posts_المنشورات_والصور';
const destDir = path.resolve('public/media/authentic');

const map = [
  { src: path.join(gmapsDir, 'Photo_01.jpg'), dest: 'hero_interior.jpg' },
  { src: path.join(gmapsDir, 'Photo_03.jpg'), dest: 'facade_exterior.jpg' },
  { src: path.join(gmapsDir, 'Photo_04.jpg'), dest: 'street_hydra.jpg' },
  { src: path.join(gmapsDir, 'Photo_06.jpg'), dest: 'hydrafacial_treatment.jpg' },
  { src: path.join(gmapsDir, 'Photo_09.jpg'), dest: 'sothys_products.jpg' },
  { src: path.join(gmapsDir, 'Photo_10.jpg'), dest: 'salon_lounge_interior.jpg' },
  { src: path.join(gmapsDir, 'Photo_11.jpg'), dest: 'lash_lift.jpg' },
  { src: path.join(gmapsDir, 'Photo_13.jpg'), dest: 'shiny_hair.jpg' },
  { src: path.join(gmapsDir, 'Photo_20.jpg'), dest: 'pedicure_station.jpg' },
  { src: path.join(instaPostsDir, 'Post_Photo_05.jpg'), dest: 'nails_biab.jpg' },
  { src: path.join(instaPostsDir, 'Post_Photo_03.jpg'), dest: 'insta_work_1.jpg' },
  { src: path.join(instaPostsDir, 'Post_Photo_01.jpg'), dest: 'insta_work_2.jpg' }
];

map.forEach(item => {
  if (fs.existsSync(item.src)) {
    fs.copyFileSync(item.src, path.join(destDir, item.dest));
    console.log(`Copied ${item.dest}`);
  }
});
