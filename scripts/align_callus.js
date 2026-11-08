const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'media', 'comparison');
const v34 = path.join(__dirname, '..', 'public', 'media', 'callus_more', 'viral_34.jpg');
const v35 = path.join(__dirname, '..', 'public', 'media', 'callus_more', 'viral_35.jpg');

// viral_34 heel apex: around (380, 360)
// crop: width 720, height 720, x 20, y 200
execSync(`ffmpeg -y -i "${v34}" -vf "crop=720:720:40:200" "${path.join(outDir, 'callus_before.jpg')}"`);

// viral_35 heel apex: around (450, 240)
// crop: width 720, height 720, x 110, y 80
execSync(`ffmpeg -y -i "${v35}" -vf "crop=720:720:110:80" "${path.join(outDir, 'callus_after.jpg')}"`);

console.log('Saved calibrated callus_before.jpg and callus_after.jpg');
