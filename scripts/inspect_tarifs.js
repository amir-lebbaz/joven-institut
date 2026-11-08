const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function inspectTarifs() {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const dir = 'C:\\Users\\amir\\OneDrive\\Desktop\\صالون\\01_Instagram\\03_Highlights_الهايلاتات\\01_Tarifs_الأسعار_والتسعيرات';

  // Copy tarifs slides to public/media/authentic so we can read and use them directly!
  const destDir = path.resolve('public/media/authentic');
  ['Slide_01.jpg', 'Slide_02.jpg', 'Slide_04.jpg'].forEach(f => {
    fs.copyFileSync(path.join(dir, f), path.join(destDir, 'tarif_' + f));
    console.log(`Copied tarif_${f}`);
  });

  await browser.close();
}

inspectTarifs().catch(console.error);
