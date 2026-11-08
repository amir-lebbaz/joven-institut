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
  page.on('pageerror', err => console.error('Page error:', err.message));

  await page.goto('http://localhost:3000/admin.html', { waitUntil: 'domcontentloaded' });
  await page.type('#adminPass', 'joven2026');
  await page.click('#loginBtn');
  await new Promise(r => setTimeout(r, 2000));

  console.log('Switching to gallery tab...');
  await page.evaluate(() => switchTab('gallery'));
  await new Promise(r => setTimeout(r, 1000));

  const initCount = await page.evaluate(() => document.querySelectorAll('#galleryGrid .gallery-card').length);
  console.log('Initial gallery count:', initCount);

  console.log('Opening modal...');
  await page.evaluate(() => openGalleryModal());
  await new Promise(r => setTimeout(r, 500));

  console.log('Typing title...');
  await page.type('#galTitle', 'Photo Test Precision');
  
  console.log('Typing image URL...');
  await page.type('#galImageUrl', 'media/hydra_after.jpg');

  console.log('Submitting form...');
  await page.click('#galleryForm button[type="submit"]');
  await new Promise(r => setTimeout(r, 2500));

  const afterAdd = await page.evaluate(() => document.querySelectorAll('#galleryGrid .gallery-card').length);
  console.log('Count after add:', afterAdd);

  console.log('Deleting test photo...');
  const deleted = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#galleryGrid .gallery-card'));
    const target = cards.find(c => c.textContent.includes('Photo Test Precision'));
    if (!target) return false;
    const btn = target.querySelector('.btn-danger');
    if (btn) { btn.click(); return true; }
    return false;
  });
  console.log('Triggered delete:', deleted);
  await new Promise(r => setTimeout(r, 2500));

  const afterDel = await page.evaluate(() => document.querySelectorAll('#galleryGrid .gallery-card').length);
  console.log('Count after delete:', afterDel);

  await browser.close();
  console.log('DONE!');
})();
