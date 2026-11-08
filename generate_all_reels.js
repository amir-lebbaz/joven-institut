const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const postsDir = path.join(__dirname, 'public', 'media', 'posts');
const reelsDir = path.join(__dirname, 'public', 'media', 'reels');

const reels = [
  {
    input: path.join(postsDir, 'post-1.webp'),
    output: path.join(reelsDir, 'reel-1.mp4'),
    poster: path.join(reelsDir, 'reel-1-poster.webp')
  },
  {
    input: path.join(postsDir, 'post-2.webp'),
    output: path.join(reelsDir, 'reel-2.mp4'),
    poster: path.join(reelsDir, 'reel-2-poster.webp')
  },
  {
    input: path.join(postsDir, 'post-3.webp'),
    output: path.join(reelsDir, 'reel-3.mp4'),
    poster: path.join(reelsDir, 'reel-3-poster.webp')
  },
  {
    input: path.join(postsDir, 'post-4.webp'),
    output: path.join(reelsDir, 'reel-4.mp4'),
    poster: path.join(reelsDir, 'reel-4-poster.webp')
  }
];

for (const r of reels) {
  console.log(`Generating ${path.basename(r.output)}...`);
  // Copy poster
  fs.copyFileSync(r.input, r.poster);
  
  // Generate vertical 9:16 video
  const cmd = `ffmpeg -loop 1 -i "${r.input}" -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 -c:v libx264 -t 6 -pix_fmt yuv420p -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" -c:a aac -b:a 128k -shortest -y "${r.output}"`;
  execSync(cmd, { stdio: 'inherit' });
}

console.log('All 4 reels and posters generated successfully!');
