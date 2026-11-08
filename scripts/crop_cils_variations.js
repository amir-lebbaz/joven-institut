const { execSync } = require('child_process');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'media', 'comparison');
const src = path.join(__dirname, '..', 'public', 'media', 'cils_sample', 'Slide_07.jpg');

// Crop client eye (right eye on photo, around x=580 to 1080)
// Width: 530, Height: 530
// Top photo: y=420. x around 550.
execSync(`ffmpeg -y -i "${src}" -vf "crop=530:530:550:420" "${path.join(outDir, 'cils_macro_before.jpg')}"`);
execSync(`ffmpeg -y -i "${src}" -vf "crop=530:530:550:960" "${path.join(outDir, 'cils_macro_after.jpg')}"`);

// Also let's try the left eye (with the Joven signature logo!):
// x from 50 to 580 (width 530)
execSync(`ffmpeg -y -i "${src}" -vf "crop=530:530:40:420" "${path.join(outDir, 'cils_logo_before.jpg')}"`);
execSync(`ffmpeg -y -i "${src}" -vf "crop=530:530:40:960" "${path.join(outDir, 'cils_logo_after.jpg')}"`);

console.log('Saved cils crops');
