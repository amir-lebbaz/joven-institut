const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'media', 'slider_renders');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  // Helper to screenshot #avant-apres safely
  async function shoot(filename) {
    const el = await page.$('#avant-apres');
    await el.screenshot({ path: path.join(outDir, filename) });
    console.log('Saved', filename);
  }

  // 1. Desktop 1440px - Callus Peeling (FR)
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    document.getElementById('avant-apres').scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 600));
  await shoot('01_desktop_callus_fr.jpg');

  // 2. Drag handle to 35%
  await page.evaluate(() => {
    updateSliderPosition(35);
  });
  await new Promise(r => setTimeout(r, 300));
  await shoot('02_desktop_callus_drag35.jpg');

  // 3. Switch to Cils (Lash Lift) tab
  await page.evaluate(() => {
    setComparisonTreatment('cils');
  });
  await new Promise(r => setTimeout(r, 600));
  await shoot('03_desktop_cils_fr.jpg');

  // 4. Switch to Hydrafacial tab
  await page.evaluate(() => {
    setComparisonTreatment('hydra');
  });
  await new Promise(r => setTimeout(r, 600));
  await shoot('04_desktop_hydra_fr.jpg');

  // 5. Switch to Arabic (AR - RTL) with Callus Peeling
  await page.evaluate(() => {
    switchLanguage('ar');
    setComparisonTreatment('callus');
  });
  await new Promise(r => setTimeout(r, 600));
  await shoot('05_desktop_callus_ar_rtl.jpg');

  // 6. Mobile 390px (iPhone 14) - Arabic RTL
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    document.getElementById('avant-apres').scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));
  await shoot('06_mobile_callus_ar.jpg');

  // 7. Mobile 390px - French LTR with Cils
  await page.evaluate(() => {
    switchLanguage('fr');
    setComparisonTreatment('cils');
  });
  await new Promise(r => setTimeout(r, 600));
  await shoot('07_mobile_cils_fr.jpg');

  await browser.close();
  console.log('All screenshots captured successfully!');
})();
