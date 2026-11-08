const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'media', 'callus_more');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const v_viral = 'C:\\Users\\amir\\OneDrive\\Desktop\\صالون\\05_تنظيم_الموقع_حسب_الصفحات\\01_الصفحة_الرئيسية_Homepage\\02_أبرز_الخدمات_الأكثر_طلباً_Best_Sellers\\01_فيديو_تقشير_القدمين_الفيروسي_1000likes.mp4';
const v_2h = 'C:\\Users\\amir\\OneDrive\\Desktop\\صالون\\05_تنظيم_الموقع_حسب_الصفحات\\03_صفحة_تقشير_القدمين_والبديكير_Callus_Peeling\\03_فيديو_جلسة_البديكير_المتقنة_ساعتين.mp4';

console.log('Extracting from viral...');
execSync(`ffmpeg -y -i "${v_viral}" -vf "fps=1" "${path.join(outDir, 'viral_%02d.jpg')}"`, { stdio: 'ignore' });

console.log('Extracting from 2h...');
execSync(`ffmpeg -y -i "${v_2h}" -vf "fps=1" "${path.join(outDir, 'twoh_%02d.jpg')}"`, { stdio: 'ignore' });

console.log('Done, extracted files:', fs.readdirSync(outDir).length);
