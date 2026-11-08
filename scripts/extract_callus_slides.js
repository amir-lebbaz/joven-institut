const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\amir\\OneDrive\\Desktop\\صالون\\01_Instagram\\03_Highlights_الهايلاتات\\06_Callus_Peeling_تقشير_القدمين';
const outDir = path.join(__dirname, '..', 'public', 'media', 'callus_all_slides');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));
console.log('Extracting frames from', files.length, 'videos...');

files.forEach(f => {
  const baseName = f.replace('.mp4', '');
  const videoPath = path.join(dir, f);
  try {
    execSync(`ffmpeg -y -ss 00:00:01 -i "${videoPath}" -vframes 1 -q:v 2 "${path.join(outDir, baseName + '_start.jpg')}"`, { stdio: 'ignore' });
    execSync(`ffmpeg -y -sseof -2 -i "${videoPath}" -vframes 1 -q:v 2 "${path.join(outDir, baseName + '_end.jpg')}"`, { stdio: 'ignore' });
  } catch(e) {
    console.error('Error on', f, e.message);
  }
});

console.log('Extracted frames count:', fs.readdirSync(outDir).length);
