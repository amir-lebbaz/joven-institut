const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });

  console.log('--- STARTING COMPREHENSIVE CRUD VERIFICATION ---');

  // STEP 1: Admin Login
  const adminPage = await browser.newPage();
  await adminPage.setViewport({ width: 1440, height: 900 });

  // Handle all confirm() dialogs automatically
  adminPage.on('dialog', async dialog => {
    console.log('Dialog prompt:', dialog.message());
    await dialog.accept();
  });

  await adminPage.goto('http://localhost:3000/admin.html', { waitUntil: 'domcontentloaded' });
  await adminPage.type('#adminPass', 'joven2026');
  await adminPage.click('#loginBtn');
  await new Promise(r => setTimeout(r, 2000));

  // STEP 2: Test OFFERS Addition & Deletion
  console.log('\n[TEST 1] Testing Offers Addition & Deletion in Admin...');
  await adminPage.evaluate(() => switchTab('offers'));
  await new Promise(r => setTimeout(r, 1000));

  const initialOffers = await adminPage.evaluate(() => {
    return document.querySelectorAll('#offersGrid .data-card').length;
  });
  console.log('Initial offers count in admin:', initialOffers);

  // Add a new offer
  console.log('Opening Add Offer modal...');
  await adminPage.evaluate(() => openOfferModal());
  await adminPage.type('#offerTitle', 'Forfait Test Precision');
  await adminPage.type('#offerTitleAr', 'باقة تجربة الحذف الدقيق');
  await adminPage.type('#offerBadge', '-35% Test');
  await adminPage.type('#offerNewPrice', '9 900 DA');
  await adminPage.type('#offerOldPrice', '15 000 DA');
  await adminPage.type('#offerDesc', 'Test description pour validation.');
  
  console.log('Submitting new offer...');
  await adminPage.click('#offerForm button[type="submit"]');
  await new Promise(r => setTimeout(r, 2500));

  const afterAddOffers = await adminPage.evaluate(() => {
    return document.querySelectorAll('#offersGrid .data-card').length;
  });
  console.log('Offers count after add:', afterAddOffers);
  if (afterAddOffers !== initialOffers + 1) {
    throw new Error(`Expected ${initialOffers + 1} offers, but found ${afterAddOffers}`);
  }

  // Verify on public homepage
  const homePage = await browser.newPage();
  await homePage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));

  const offerOnHome = await homePage.evaluate(() => {
    return Array.from(document.querySelectorAll('.offer-card-title')).some(el => el.textContent.includes('Forfait Test Precision'));
  });
  console.log('New offer visible on homepage:', offerOnHome);
  if (!offerOnHome) throw new Error('Offer not visible on homepage!');

  // Now DELETE the newly added offer from Admin
  console.log('Deleting the offer from admin...');
  const deleted = await adminPage.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#offersGrid .data-card'));
    const targetCard = cards.find(c => c.textContent.includes('Forfait Test Precision'));
    if (!targetCard) return false;
    const deleteBtn = targetCard.querySelector('.btn-danger');
    if (deleteBtn) {
      deleteBtn.click();
      return true;
    }
    return false;
  });
  console.log('Triggered delete button:', deleted);
  await new Promise(r => setTimeout(r, 2500));

  const afterDeleteOffers = await adminPage.evaluate(() => {
    return document.querySelectorAll('#offersGrid .data-card').length;
  });
  console.log('Offers count after deletion:', afterDeleteOffers);
  if (afterDeleteOffers !== initialOffers) {
    throw new Error(`Expected ${initialOffers} offers after delete, but found ${afterDeleteOffers}`);
  }

  // Reload homepage and verify it's TRULY GONE
  await homePage.reload({ waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  const offerStillOnHome = await homePage.evaluate(() => {
    return Array.from(document.querySelectorAll('.offer-card-title')).some(el => el.textContent.includes('Forfait Test Precision'));
  });
  console.log('Offer still on homepage (should be FALSE):', offerStillOnHome);
  if (offerStillOnHome) throw new Error('Offer was NOT deleted from homepage!');


  // STEP 3: Test GALLERY Addition & Deletion
  console.log('\n[TEST 2] Testing Gallery Addition & Deletion in Admin...');
  await adminPage.evaluate(() => switchTab('gallery'));
  await new Promise(r => setTimeout(r, 1000));

  const initialGallery = await adminPage.evaluate(() => {
    return document.querySelectorAll('#galleryGrid .gallery-card').length;
  });
  console.log('Initial gallery count in admin:', initialGallery);

  // Add photo
  console.log('Opening Add Photo modal...');
  await adminPage.evaluate(() => openGalleryModal());
  await adminPage.type('#galTitle', 'Photo Test Precision');
  await adminPage.type('#galImageUrl', 'media/hydra_after.jpg');
  await adminPage.click('#galleryForm button[type="submit"]');
  await new Promise(r => setTimeout(r, 2500));

  const afterAddGal = await adminPage.evaluate(() => {
    return document.querySelectorAll('#galleryGrid .gallery-card').length;
  });
  console.log('Gallery count after add:', afterAddGal);
  if (afterAddGal !== initialGallery + 1) {
    throw new Error(`Expected ${initialGallery + 1} gallery items, but found ${afterAddGal}`);
  }

  // Now delete photo
  console.log('Deleting the photo from admin...');
  const galDeleted = await adminPage.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#galleryGrid .gallery-card'));
    const targetCard = cards.find(c => c.textContent.includes('Photo Test Precision'));
    if (!targetCard) return false;
    const deleteBtn = targetCard.querySelector('.btn-danger');
    if (deleteBtn) {
      deleteBtn.click();
      return true;
    }
    return false;
  });
  console.log('Triggered delete photo button:', galDeleted);
  await new Promise(r => setTimeout(r, 2500));

  const afterDeleteGal = await adminPage.evaluate(() => {
    return document.querySelectorAll('#galleryGrid .gallery-card').length;
  });
  console.log('Gallery count after deletion:', afterDeleteGal);
  if (afterDeleteGal !== initialGallery) {
    throw new Error(`Expected ${initialGallery} gallery items after delete, but found ${afterDeleteGal}`);
  }

  await browser.close();
  console.log('\n🎉 ALL DELETIONS AND ADDITIONS TESTED AND VERIFIED WITH 100% ACCURACY!');
})();
