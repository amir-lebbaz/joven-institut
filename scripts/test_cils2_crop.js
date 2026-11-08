const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'media', 'comparison');
const src = 'C:\\Users\\amir\\OneDrive\\Desktop\\صالون\\01_Instagram\\03_Highlights_الهايلاتات\\05_Cils_عناية_ورفع_الرموش\\Slide_01.jpg';

// Slide_01 top photo: y ~420 to 950, bottom: y ~960 to 1490
execSync(`ffmpeg -y -i "${src}" -vf "crop=1080:530:0:420" "${path.join(outDir, 'cils2_before.jpg')}"`);
execSync(`ffmpeg -y -i "${src}" -vf "crop=1080:530:0:960" "${path.join(outDir, 'cils2_after.jpg')}"`);

console.log('Cropped cils2 before and after');
