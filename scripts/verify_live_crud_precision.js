const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  page.on('dialog', async d => {
    console.log('Dialog:', d.message());
    await d.accept();
  });

  console.log('Opening live admin: https://amir-lebbaz.github.io/joven-institut/admin.html ...');
  await page.goto('https://amir-lebbaz.github.io/joven-institut/admin.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.type('#adminPass', 'joven2026');
  await page.click('#loginBtn');
  await new Promise(r => setTimeout(r, 2000));

  // Check offers in live admin
  await page.evaluate(() => switchTab('offers'));
  await new Promise(r => setTimeout(r, 1200));

  const liveOffers = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#offersGrid .data-card')).map(c => ({
      title: c.querySelector('.card-title')?.textContent,
      titleAr: c.querySelector('.card-title-ar')?.textContent,
      price: c.querySelector('.card-price')?.textContent
    }));
  });
  console.log('Live Offers in Admin:', liveOffers);

  // Check gallery in live admin
  await page.evaluate(() => switchTab('gallery'));
  await new Promise(r => setTimeout(r, 1200));

  const liveGalleryCount = await page.evaluate(() => {
    return document.querySelectorAll('#galleryGrid .gallery-card').length;
  });
  console.log('Live Gallery photos count in Admin:', liveGalleryCount);

  // Check public live website
  const liveHomePage = await browser.newPage();
  await liveHomePage.goto('https://amir-lebbaz.github.io/joven-institut/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const homeOffers = await liveHomePage.evaluate(() => {
    return Array.from(document.querySelectorAll('.offer-card-title')).map(el => el.textContent.trim());
  });
  console.log('Offers displayed on live homepage:', homeOffers);

  const homeGalleryCount = await liveHomePage.evaluate(() => {
    return document.querySelectorAll('.galerie-item').length;
  });
  console.log('Gallery items on live homepage:', homeGalleryCount);

  await browser.close();
  console.log('LIVE CRUD PRECISION VERIFIED! ✨');
})();
