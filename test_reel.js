const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function testReelDownload() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0');

  let videoUrl = null;
  page.on('response', async (res) => {
    const url = res.url();
    const contentType = res.headers()['content-type'] || '';
    if (contentType.includes('video/mp4') || url.includes('.mp4')) {
      console.log('Intercepted MP4 video response:', url.slice(0, 100));
      if (!videoUrl) videoUrl = url;
    }
  });

  try {
    console.log('Visiting reel: https://www.instagram.com/joven_institut/reel/DepQwh1sd0A/...');
    await page.goto('https://www.instagram.com/joven_institut/reel/DepQwh1sd0A/', { waitUntil: 'networkidle2', timeout: 25000 });
    
    const domVideo = await page.evaluate(() => {
      const v = document.querySelector('video');
      return v ? v.src : null;
    });
    console.log('DOM video src:', domVideo ? domVideo.slice(0, 100) : 'none');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await browser.close();
  }
}

testReelDownload();
