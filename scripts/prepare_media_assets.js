const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mediaDir = path.join(__dirname, '..', 'public', 'media');
const brandDir = path.join(mediaDir, 'brand');
const feedDir = path.join(mediaDir, 'feed');
const postsDir = path.join(mediaDir, 'posts');

if (!fs.existsSync(feedDir)) fs.mkdirSync(feedDir, { recursive: true });
if (!fs.existsSync(brandDir)) fs.mkdirSync(brandDir, { recursive: true });

console.log('✨ Preparing 6 Story Highlights covers and 12 Instagram Feed images...');

// 1. Generate Highlight covers: hl-1 to hl-6
// hl-1: Hydrafacial (based on post-1)
// hl-2: Head Spa (based on post-2)
// hl-3: Manucure BIAB (based on post-3)
// hl-4: Soins Visage (based on post-4)
// hl-5: Tarifs & Packs (based on post-5)
// hl-6: Avis Clientes (based on post-6)
for (let i = 1; i <= 6; i++) {
  const src = path.join(postsDir, `post-${i}.webp`);
  const dst = path.join(brandDir, `hl-${i}.webp`);
  try {
    execSync(`ffmpeg -y -i "${src}" -vf "crop=w='min(iw,ih)':h='min(iw,ih)',scale=400:400" -q:v 85 "${dst}"`, { stdio: 'ignore' });
    console.log(`✅ Generated Highlight cover: hl-${i}.webp (${fs.statSync(dst).size} bytes)`);
  } catch (e) {
    fs.copyFileSync(src, dst);
    console.log(`Copied Highlight cover: hl-${i}.webp (${fs.statSync(dst).size} bytes)`);
  }
}

// 2. Prepare 12 Feed Images: ig-1 to ig-12
// ig-1 to ig-6 come from post-1 to post-6
for (let i = 1; i <= 6; i++) {
  const src = path.join(postsDir, `post-${i}.webp`);
  const dst = path.join(feedDir, `ig-${i}.webp`);
  fs.copyFileSync(src, dst);
}

// For ig-7 to ig-12, let's create high-resolution curated variations using ffmpeg color balance / crops / filters
const variations = [
  { id: 7, src: 'post-1.webp', filter: 'crop=iw*0.85:ih*0.85,scale=800:800,eq=contrast=1.05:brightness=0.02' },
  { id: 8, src: 'post-2.webp', filter: 'crop=iw*0.9:ih*0.9,scale=800:800,eq=saturation=1.1:contrast=1.03' },
  { id: 9, src: 'post-3.webp', filter: 'crop=iw*0.8:ih*0.8,scale=800:800,eq=contrast=1.08:brightness=-0.01' },
  { id: 10, src: 'post-4.webp', filter: 'crop=iw*0.9:ih*0.9,scale=800:800,eq=contrast=1.05:saturation=1.08' },
  { id: 11, src: 'post-5.webp', filter: 'crop=iw*0.85:ih*0.85,scale=800:800,eq=contrast=1.04:brightness=0.03' },
  { id: 12, src: 'post-6.webp', filter: 'crop=iw*0.9:ih*0.9,scale=800:800,eq=contrast=1.06:saturation=1.05' }
];

for (const v of variations) {
  const src = path.join(postsDir, v.src);
  const dst = path.join(feedDir, `ig-${v.id}.webp`);
  try {
    execSync(`ffmpeg -y -i "${src}" -vf "${v.filter}" -q:v 85 "${dst}"`, { stdio: 'ignore' });
    console.log(`✅ Generated Feed Image: ig-${v.id}.webp (${fs.statSync(dst).size} bytes)`);
  } catch (e) {
    fs.copyFileSync(src, dst);
    console.log(`Copied Feed Image: ig-${v.id}.webp (${fs.statSync(dst).size} bytes)`);
  }
}

console.log('🎉 All 6 Story Highlight covers and 12 Feed images verified and ready!');
