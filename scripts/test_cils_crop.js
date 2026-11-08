const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'media', 'comparison');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const srcCils = path.join(__dirname, '..', 'public', 'media', 'cils_sample', 'Slide_07.jpg');

// Let's crop top: width 1080, height 530, x 0, y 420
// Let's crop bottom: width 1080, height 530, x 0, y 960
execSync(`ffmpeg -y -i "${srcCils}" -vf "crop=1080:530:0:420" "${path.join(outDir, 'cils_before_test.jpg')}"`);
execSync(`ffmpeg -y -i "${srcCils}" -vf "crop=1080:530:0:960" "${path.join(outDir, 'cils_after_test.jpg')}"`);

console.log('Cropped cils before & after');
