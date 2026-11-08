const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'media', 'comparison');

// 1. Copy macro cils as the official cils
fs.copyFileSync(path.join(outDir, 'cils_macro_before.jpg'), path.join(outDir, 'cils_before.jpg'));
fs.copyFileSync(path.join(outDir, 'cils_macro_after.jpg'), path.join(outDir, 'cils_after.jpg'));

// 2. Crop 1:1 square for hydra
const srcHydra = path.join(__dirname, '..', 'public', 'media', 'gmaps_sample', 'Photo_02.jpg');
// Crop 644x644, x=220, y=0 for top
execSync(`ffmpeg -y -i "${srcHydra}" -vf "crop=644:644:220:0" "${path.join(outDir, 'hydra_square_before.jpg')}"`);
// Crop 644x644, x=220, y=644 for bottom
execSync(`ffmpeg -y -i "${srcHydra}" -vf "crop=644:644:220:644" "${path.join(outDir, 'hydra_square_after.jpg')}"`);

fs.copyFileSync(path.join(outDir, 'hydra_square_before.jpg'), path.join(outDir, 'hydra_before.jpg'));
fs.copyFileSync(path.join(outDir, 'hydra_square_after.jpg'), path.join(outDir, 'hydra_after.jpg'));

console.log('Optimized 1:1 comparison pairs for all 3 treatments!');
