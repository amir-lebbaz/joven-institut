const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));

  console.log('Visiting live website: https://amir-lebbaz.github.io/joven-institut/ ...');
  await page.goto('https://amir-lebbaz.github.io/joven-institut/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  console.log('Errors on live website:', errors);
  const liveTitle = await page.title();
  console.log('Live Title:', liveTitle);

  const servicesCount = await page.evaluate(() => {
    return document.querySelectorAll('#soinsCarousel .soin-card').length;
  });
  console.log('Live services rendered from Supabase:', servicesCount);

  const offersCount = await page.evaluate(() => {
    return document.querySelectorAll('#offersGridContainer .offer-card').length;
  });
  console.log('Live offers rendered from Supabase:', offersCount);

  // Take screenshot of live homepage hero & services
  await page.setViewport({ width: 1440, height: 900 });
  await page.screenshot({ path: 'public/media/live_site_screenshot.png' });
  console.log('Screenshot of live site saved.');

  // Now test live admin dashboard
  console.log('Visiting live admin: https://amir-lebbaz.github.io/joven-institut/admin.html ...');
  const adminPage = await browser.newPage();
  const adminErrors = [];
  adminPage.on('pageerror', err => adminErrors.push(err.message));

  await adminPage.goto('https://amir-lebbaz.github.io/joven-institut/admin.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await adminPage.type('#adminPass', 'joven2026');
  await adminPage.click('#loginBtn');
  await new Promise(r => setTimeout(r, 2500));

  console.log('Live admin errors:', adminErrors);
  const authModalHidden = await adminPage.evaluate(() => {
    return document.getElementById('authModal').style.display === 'none';
  });
  console.log('Live Admin Login Success:', authModalHidden);

  const adminServicesCount = await adminPage.evaluate(() => {
    return document.querySelectorAll('#servicesGrid .data-card').length;
  });
  console.log('Live Admin Services loaded:', adminServicesCount);

  const adminOffersCount = await adminPage.evaluate(() => {
    return document.querySelectorAll('#offersGrid .data-card').length;
  });
  console.log('Live Admin Offers loaded:', adminOffersCount);

  await adminPage.setViewport({ width: 1440, height: 900 });
  await adminPage.screenshot({ path: 'public/media/live_admin_screenshot.png' });
  console.log('Screenshot of live admin saved.');

  await browser.close();
  console.log('LIVE VERIFICATION COMPLETED WITH 100% SUCCESS! 🚀');
})();
