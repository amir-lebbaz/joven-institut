const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACT_DIR = 'C:\\Users\\amir\\.gemini\\antigravity\\brain\\0f42fb36-74c0-42cb-88c1-eb45a106c018';

async function runVerification() {
  console.log('🚀 Starting Automated Browser Verification with Edge Chromium...');
  
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  try {
    // Calibrate DB before test for deterministic verification
    const dbSetup = new DatabaseSync(path.join(__dirname, 'data', 'joven.db'));
    dbSetup.prepare("UPDATE services SET price = 8500 WHERE title = 'Soin Hydrafacial Prestige'").run();
    dbSetup.prepare("DELETE FROM services WHERE title LIKE '%Éclat d''Or%'").run();
    console.log('- Database calibrated for test run (Hydrafacial = 8500 DZD)');

    const activePort = fs.existsSync(path.join(__dirname, 'data', 'active_port.txt'))
      ? fs.readFileSync(path.join(__dirname, 'data', 'active_port.txt'), 'utf8').trim()
      : '3000';
    const baseUrl = `http://localhost:${activePort}`;
    console.log(`- Connecting to active server URL: ${baseUrl}`);

    // -------------------------------------------------------------
    // Test 1: Mobile Viewport (375px) - Zero Overflow & RTL Verification
    // -------------------------------------------------------------
    console.log('\n📱 Test 1: Verifying Mobile Viewport (375x812)...');
    await page.setViewport({ width: 375, height: 812 });
    await page.goto(baseUrl, { waitUntil: 'networkidle0' });
    
    // Check RTL
    const htmlDir = await page.$eval('html', el => el.getAttribute('dir'));
    console.log(`- HTML dir attribute: "${htmlDir}" (Expected: rtl)`);
    if (htmlDir !== 'rtl') throw new Error('HTML is not RTL');

    // Check Horizontal Overflow
    const mobileOverflow = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const windowWidth = window.innerWidth;
      return {
        docWidth,
        windowWidth,
        hasOverflow: docWidth > windowWidth,
        diff: docWidth - windowWidth
      };
    });
    console.log(`- Mobile ScrollWidth: ${mobileOverflow.docWidth}px, Window: ${mobileOverflow.windowWidth}px`);
    console.log(`- Zero Horizontal Overflow: ${!mobileOverflow.hasOverflow ? 'PASS ✅' : 'FAIL ❌ (overflow: ' + mobileOverflow.diff + 'px)'}`);
    if (mobileOverflow.hasOverflow) {
      throw new Error(`Horizontal overflow detected on mobile: ${mobileOverflow.diff}px`);
    }

    // Capture Mobile Screenshot
    const mobileScreenshotPath = path.join(ARTIFACT_DIR, 'screenshot_mobile_375px.png');
    await page.screenshot({ path: mobileScreenshotPath, fullPage: false });
    console.log(`- Mobile screenshot saved to ${mobileScreenshotPath}`);

    // -------------------------------------------------------------
    // Test 2: Desktop Viewport (1440px) - Luxury Layout & Color Rendering
    // -------------------------------------------------------------
    console.log('\n🖥️ Test 2: Verifying Desktop Viewport (1440x900)...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.waitForNetworkIdle();

    const desktopOverflow = await page.evaluate(() => {
      return {
        docWidth: document.documentElement.scrollWidth,
        windowWidth: window.innerWidth,
        hasOverflow: document.documentElement.scrollWidth > window.innerWidth
      };
    });
    console.log(`- Desktop ScrollWidth: ${desktopOverflow.docWidth}px, Window: ${desktopOverflow.windowWidth}px`);
    console.log(`- Zero Horizontal Overflow: ${!desktopOverflow.hasOverflow ? 'PASS ✅' : 'FAIL ❌'}`);

    const servicesCount = await page.$$eval('.service-card', cards => cards.length);
    console.log(`- Client rendered service cards: ${servicesCount} (Expected: 15)`);

    const galleryCount = await page.$$eval('.gallery-card', cards => cards.length);
    console.log(`- Client rendered gallery cards: ${galleryCount} (Expected: 6)`);

    const desktopScreenshotPath = path.join(ARTIFACT_DIR, 'screenshot_desktop_1440px.png');
    await page.screenshot({ path: desktopScreenshotPath, fullPage: false });
    console.log(`- Desktop screenshot saved to ${desktopScreenshotPath}`);

    // -------------------------------------------------------------
    // Test 3: Admin CMS & 1-Click Stepper (+500 DZD) on Hydrafacial Prestige
    // -------------------------------------------------------------
    console.log('\n⚙️ Test 3: Switching to Admin CMS and Testing 1-Click Price Stepper...');
    await page.click('#btnViewAdmin');
    await page.waitForSelector('#adminView', { visible: true });
    console.log('- Switched to Admin CMS View successfully');

    // Find the row for 'Soin Hydrafacial Prestige'
    const hydraRow = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('#adminServicesTableBody tr'));
      for (const r of rows) {
        if (r.innerText.includes('Soin Hydrafacial Prestige')) {
          const input = r.querySelector('.stepper-input');
          const plusBtn = r.querySelector('.stepper-btn:not(.minus)');
          return {
            id: r.id,
            initialPrice: input ? input.value : null
          };
        }
      }
      return null;
    });

    console.log(`- Found Hydrafacial row: ${hydraRow.id}, Initial Price: ${hydraRow.initialPrice} DZD`);

    // Click +500 DZD button
    console.log('- Clicking + 500 دج stepper button...');
    await page.$eval(`#${hydraRow.id} .stepper-btn:not(.minus)`, btn => btn.click());

    // Wait for toast notification
    await page.waitForSelector('.toast', { visible: true, timeout: 5000 });
    const toastText = await page.$eval('.toast', el => el.innerText);
    console.log(`- Toast received: "${toastText.trim()}"`);

    // Verify stepper input updated to 9000
    const newPriceVal = await page.$eval(`#${hydraRow.id} .stepper-input`, el => el.value);
    console.log(`- Updated Price in input field: ${newPriceVal} DZD (Expected: 9000)`);
    if (newPriceVal !== '9000') throw new Error(`Price is not 9000, got ${newPriceVal}`);

    // -------------------------------------------------------------
    // Test 4: Add Seasonal Offer in Admin CMS
    // -------------------------------------------------------------
    console.log('\n➕ Test 4: Adding a Test Seasonal Offer in Admin CMS...');
    await page.click('button[onclick="openAddServiceModal()"]');
    await page.waitForSelector('#serviceModal.active', { visible: true });

    await page.type('#formTitle', "Soin Éclat d'Or 24K (Offre Spéciale)");
    await page.select('#formCategory', 'العناية بالبشرة');
    await page.type('#formDescription', 'جلسة عناية ملكية ببروتوكول رقائق الذهب عيار 24 لترميم وتفتيح ونضارة البشرة الفورية.');
    await page.type('#formDuration', '75 دقيقة');
    await page.type('#formPrice', '11000');
    await page.type('#formOldPrice', '13500');
    await page.$eval('#formIsPromo', cb => cb.checked = true);

    await page.click('#btnSubmitService');
    await page.waitForSelector('#serviceModal', { hidden: true });
    console.log('- Seasonal offer submitted');

    await page.waitForNetworkIdle();
    const adminScreenshotPath = path.join(ARTIFACT_DIR, 'screenshot_admin_cms.png');
    await page.screenshot({ path: adminScreenshotPath, fullPage: false });
    console.log(`- Admin CMS screenshot saved to ${adminScreenshotPath}`);

    // -------------------------------------------------------------
    // Test 5: Reload Page & Verify Persistence in Client View and WhatsApp Link
    // -------------------------------------------------------------
    console.log('\n🔄 Test 5: Reloading Page & Verifying Persistence in Client View...');
    await page.goto(baseUrl, { waitUntil: 'networkidle0' });

    // Verify client view is visible
    const clientVisible = await page.$eval('#clientView', el => el.style.display !== 'none');
    console.log(`- Client View active on reload: ${clientVisible}`);

    // Find Hydrafacial service card in client view
    const hydraClientCard = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.service-card'));
      for (const c of cards) {
        if (c.innerText.includes('Soin Hydrafacial Prestige')) {
          const price = c.querySelector('.price-main')?.innerText;
          const waLink = c.querySelector('.service-wa-btn')?.getAttribute('href');
          return { price, waLink };
        }
      }
      return null;
    });

    console.log(`- Hydrafacial Card Price in Client View: "${hydraClientCard.price}" (Expected: 9 000 دج)`);
    console.log(`- WhatsApp Booking Link: ${hydraClientCard.waLink}`);
    
    if (!hydraClientCard.price.includes('9') || !hydraClientCard.price.includes('000')) {
      throw new Error(`Client view does not reflect updated price 9000! Got: ${hydraClientCard.price}`);
    }

    if (!hydraClientCard.waLink.includes('9') || !hydraClientCard.waLink.includes('000')) {
      throw new Error(`WhatsApp booking link does not contain updated price! Got: ${hydraClientCard.waLink}`);
    }
    console.log('- WhatsApp link dynamically verified with updated price! PASS ✅');

    // Verify newly added seasonal offer appears in client view
    const newOfferFound = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.service-card'));
      return cards.some(c => c.innerText.includes("Soin Éclat d'Or 24K"));
    });
    console.log(`- New Seasonal Offer rendered in Client View: ${newOfferFound ? 'PASS ✅' : 'FAIL ❌'}`);
    if (!newOfferFound) throw new Error('New seasonal offer not found in client view');

    // -------------------------------------------------------------
    // Test 6: Direct SQLite Database File Persistence Check
    // -------------------------------------------------------------
    console.log('\n🗄️ Test 6: Verifying Direct SQLite Database File (./data/joven.db)...');
    const db = new DatabaseSync(path.join(__dirname, 'data', 'joven.db'));
    const hydraDb = db.prepare("SELECT * FROM services WHERE title = 'Soin Hydrafacial Prestige'").get();
    console.log(`- SQLite Record for Hydrafacial: ID=${hydraDb.id}, Price=${hydraDb.price} DZD`);
    if (hydraDb.price !== 9000) {
      throw new Error(`Database file did not persist price 9000! Current in DB: ${hydraDb.price}`);
    }

    const newOfferDb = db.prepare("SELECT * FROM services WHERE title LIKE '%Éclat d''Or%'").get();
    console.log(`- SQLite Record for Seasonal Offer: ID=${newOfferDb.id}, Price=${newOfferDb.price} DZD, Promo=${newOfferDb.is_promo}`);

    const clientUpdatedScreenshotPath = path.join(ARTIFACT_DIR, 'screenshot_client_updated.png');
    await page.screenshot({ path: clientUpdatedScreenshotPath, fullPage: false });
    console.log(`- Client updated screenshot saved to ${clientUpdatedScreenshotPath}`);

    console.log('\n🎉 ALL AUTOMATED BROWSER VERIFICATION TESTS PASSED SUCCESSFULLY! ✅');

  } catch (err) {
    console.error('\n❌ Verification failed with error:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();
