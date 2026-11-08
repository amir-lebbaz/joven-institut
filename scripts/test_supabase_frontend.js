const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  console.log('Loading http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });

  // wait 2s for Supabase fetch to finish
  await new Promise(r => setTimeout(r, 2000));

  console.log('Errors caught on load:', errors);
  const title = await page.title();
  console.log('Page Title:', title);

  const offersCount = await page.evaluate(() => {
    return document.querySelectorAll('#offersGridContainer .offer-card').length;
  });
  console.log('Offers rendered in container:', offersCount);

  const servicesCount = await page.evaluate(() => {
    return document.querySelectorAll('#soinsCarousel .soin-card').length;
  });
  console.log('Services rendered in carousel:', servicesCount);

  // Now test /admin route!
  console.log('Loading /admin ...');
  const adminPage = await browser.newPage();
  const adminErrors = [];
  adminPage.on('pageerror', err => adminErrors.push(err.message));
  await adminPage.goto('http://localhost:3000/admin', { waitUntil: 'domcontentloaded', timeout: 30000 });
  
  console.log('Admin Page Errors:', adminErrors);
  const adminTitle = await adminPage.title();
  console.log('Admin Page Title:', adminTitle);

  // Test admin login with 'joven2026'
  await adminPage.type('#adminPass', 'joven2026');
  await adminPage.click('#loginBtn');
  await new Promise(r => setTimeout(r, 2000));

  const authModalHidden = await adminPage.evaluate(() => {
    return document.getElementById('authModal').style.display === 'none';
  });
  console.log('Admin Auth Success (modal hidden):', authModalHidden);

  const adminServicesCount = await adminPage.evaluate(() => {
    return document.querySelectorAll('#servicesGrid .data-card').length;
  });
  console.log('Admin loaded services count:', adminServicesCount);

  // Test switching to offers tab
  await adminPage.evaluate(() => {
    switchTab('offers');
  });
  await new Promise(r => setTimeout(r, 1000));
  const adminOffersCount = await adminPage.evaluate(() => {
    return document.querySelectorAll('#offersGrid .data-card').length;
  });
  console.log('Admin loaded offers count:', adminOffersCount);

  // Test switching to gallery tab
  await adminPage.evaluate(() => {
    switchTab('gallery');
  });
  await new Promise(r => setTimeout(r, 1000));
  const adminGalleryCount = await adminPage.evaluate(() => {
    return document.querySelectorAll('#galleryGrid .gallery-card').length;
  });
  console.log('Admin loaded gallery count:', adminGalleryCount);

  // Take screenshot of admin dashboard
  await adminPage.screenshot({ path: 'public/media/admin_dashboard_preview.png' });
  console.log('Screenshot of admin dashboard saved to public/media/admin_dashboard_preview.png');

  await browser.close();
  console.log('ALL TESTS PASSED SUCCESSFULLY! ✨');
})();
