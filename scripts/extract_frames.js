const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'media', 'extracted_samples');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const v1 = 'C:\\Users\\amir\\OneDrive\\Desktop\\صالون\\05_تنظيم_الموقع_حسب_الصفحات\\03_صفحة_تقشير_القدمين_والبديكير_Callus_Peeling\\01_فيديو_Callus_Peeling_BestSeller.mp4';
const v2 = 'C:\\Users\\amir\\OneDrive\\Desktop\\صالون\\05_تنظيم_الموقع_حسب_الصفحات\\03_صفحة_تقشير_القدمين_والبديكير_Callus_Peeling\\02_فيديو_نتائج_الصيف_الخيالية.mp4';
const v_hydra = 'C:\\Users\\amir\\OneDrive\\Desktop\\صالون\\05_تنظيم_الموقع_حسب_الصفحات\\02_صفحة_علاجات_البشرة_Soins_Visage\\01_فيديو_الهيدرافيشل_علاج_الرؤوس_البيضاء.mp4';

console.log('Extracting frames from Callus Peeling video 1...');
execSync(`ffmpeg -y -i "${v1}" -vf "fps=1" "${path.join(outDir, 'callus1_%02d.jpg')}"`, { stdio: 'inherit' });

console.log('Extracting frames from Callus Peeling video 2...');
execSync(`ffmpeg -y -i "${v2}" -vf "fps=1" "${path.join(outDir, 'callus2_%02d.jpg')}"`, { stdio: 'inherit' });

console.log('Extracting frames from Hydrafacial video...');
execSync(`ffmpeg -y -i "${v_hydra}" -vf "fps=1" "${path.join(outDir, 'hydra_%02d.jpg')}"`, { stdio: 'inherit' });

console.log('Done!');
