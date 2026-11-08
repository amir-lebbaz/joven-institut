const fs = require('fs');

const SUPABASE_URL = 'https://mtuhuzmyhbemdfsbyhpf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10dWh1em15aGJlbWRmc2J5aHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MjIxNDAsImV4cCI6MjA5MjQ5ODE0MH0.Pip_Y_FfjJvnOHxnAMNUlHMBLkGefVxH2dVMsXaIQ08';

const filesToUpload = [
  { local: 'public/media/authentic/video_callus_bestseller.mp4', dest: 'videos/video_callus.mp4' },
  { local: 'public/media/authentic/video_haute_frequence.mp4', dest: 'videos/video_haute_frequence.mp4' }
];

(async () => {
  for (const item of filesToUpload) {
    if (!fs.existsSync(item.local)) {
      console.log('Skipping missing:', item.local);
      continue;
    }
    const buf = fs.readFileSync(item.local);
    console.log(`Uploading ${item.local} (${buf.length} bytes)...`);
    const res = await fetch(`${SUPABASE_URL}/storage/v1/object/joven-media/${item.dest}`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'video/mp4',
        'x-upsert': 'true'
      },
      body: buf
    });
    console.log(item.dest, '-> status:', res.status);
  }
  console.log('All extra videos uploaded to Supabase!');
})();
