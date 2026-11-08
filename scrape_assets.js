const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        return reject(new Error(`Failed with status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(destPath);
          console.log(`Saved: ${destPath} (${stats.size} bytes)`);
          resolve(stats.size);
        });
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function scrapeAll() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0');

  try {
    await page.goto('https://www.instagram.com/joven_institut/', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Extract profile picture
    const profilePic = await page.evaluate(() => {
      const img = document.querySelector('header img') || document.querySelector('img[alt*="profile picture"]');
      return img ? img.src : null;
    });
    console.log('Profile Pic URL:', profilePic);

    // Extract all post and reel links
    const mediaItems = await page.evaluate(() => {
      const items = [];
      const links = Array.from(document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]'));
      for (const a of links) {
        const img = a.querySelector('img');
        const href = a.href;
        items.push({
          href,
          imgSrc: img ? img.src : null,
          alt: img ? img.alt : ''
        });
      }
      return items;
    });
    console.log(`Found ${mediaItems.length} post/reel links`);
    console.log(JSON.stringify(mediaItems.slice(0, 10), null, 2));

    // Save profile pic as joven-logo
    if (profilePic) {
      const logoPath = path.join(__dirname, 'public', 'media', 'brand', 'joven-logo.webp');
      // Replace with higher resolution url if thumbnail
      const highResLogo = profilePic.replace(/s150x150/g, 's1080x1080');
      try {
        await downloadFile(highResLogo, logoPath);
      } catch (e) {
        await downloadFile(profilePic, logoPath);
      }
    }

  } catch (err) {
    console.error('Scrape error:', err);
  } finally {
    await browser.close();
  }
}

scrapeAll();
