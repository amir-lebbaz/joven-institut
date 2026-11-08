const fs = require('fs');

const SUPABASE_URL = 'https://mtuhuzmyhbemdfsbyhpf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10dWh1em15aGJlbWRmc2J5aHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MjIxNDAsImV4cCI6MjA5MjQ5ODE0MH0.Pip_Y_FfjJvnOHxnAMNUlHMBLkGefVxH2dVMsXaIQ08';

(async () => {
  const filePath = 'public/media/authentic/video_welcome.mp4';
  const fileBuffer = fs.readFileSync(filePath);
  console.log(`Uploading ${filePath} (${fileBuffer.length} bytes) to Supabase Storage...`);

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/joven-media/videos/video_welcome.mp4`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'video/mp4',
      'x-upsert': 'true'
    },
    body: fileBuffer
  });

  const json = await res.json();
  console.log('Response:', res.status, json);
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/joven-media/videos/video_welcome.mp4`;
  console.log('Public Supabase Video URL:', publicUrl);
})();
