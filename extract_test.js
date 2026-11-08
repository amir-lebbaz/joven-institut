const puppeteer = require('puppeteer-core');
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function checkInstagram() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0');

  try {
    console.log('Navigating to https://www.instagram.com/joven_institut/...');
    const resp = await page.goto('https://www.instagram.com/joven_institut/', { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('Status:', resp.status());
    const title = await page.title();
    console.log('Page title:', title);

    const content = await page.content();
    console.log('Content length:', content.length);
    const hasLoginWall = content.includes('login') || content.includes('Log In');
    console.log('Has login wall/prompt:', hasLoginWall);

    // Look for images or profile pic
    const imgUrls = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.map(img => ({ src: img.src, alt: img.alt }));
    });
    console.log('Images found:', imgUrls.length);
    console.log('First 5 images:', imgUrls.slice(0, 5));
  } catch (err) {
    console.error('Error visiting Instagram:', err.message);
  } finally {
    await browser.close();
  }
}

checkInstagram();
