const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'media', 'comparison');
const srcHydra = path.join(__dirname, '..', 'public', 'media', 'gmaps_sample', 'Photo_02.jpg');

execSync(`ffmpeg -y -i "${srcHydra}" -vf "crop=1284:644:0:0" "${path.join(outDir, 'hydra_before.jpg')}"`);
execSync(`ffmpeg -y -i "${srcHydra}" -vf "crop=1284:644:0:644" "${path.join(outDir, 'hydra_after.jpg')}"`);

console.log('Saved hydra_before.jpg and hydra_after.jpg');
