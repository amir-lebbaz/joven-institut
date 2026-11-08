const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'media', 'hydra_deep');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const v = 'C:\\Users\\amir\\OneDrive\\Desktop\\صالون\\05_تنظيم_الموقع_حسب_الصفحات\\01_الصفحة_الرئيسية_Homepage\\02_أبرز_الخدمات_الأكثر_طلباً_Best_Sellers\\02_فيديو_الهيدرافيشل_تنظيف_عميق.mp4';
execSync(`ffmpeg -y -i "${v}" -vf "fps=1" "${path.join(outDir, 'deep_%02d.jpg')}"`, { stdio: 'ignore' });
console.log('Extracted hydra deep frames:', fs.readdirSync(outDir).length);
