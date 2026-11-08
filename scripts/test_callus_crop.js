const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'media', 'comparison');
const v34 = path.join(__dirname, '..', 'public', 'media', 'callus_more', 'viral_34.jpg');
const v35 = path.join(__dirname, '..', 'public', 'media', 'callus_more', 'viral_35.jpg');

// Let's crop width 800, height 700, centered x, y around 300
execSync(`ffmpeg -y -i "${v34}" -vf "crop=800:700:140:280" "${path.join(outDir, 'callus_before_test.jpg')}"`);
execSync(`ffmpeg -y -i "${v35}" -vf "crop=800:700:140:150" "${path.join(outDir, 'callus_after_test.jpg')}"`);

console.log('Cropped callus before and after');
