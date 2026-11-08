const express = require('express');
const path = require('path');
const fs = require('fs');
const { db, getBootstrapData } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Bootstrap API
app.get('/api/bootstrap', (req, res) => {
  try {
    const data = getBootstrapData();
    res.json({ success: true, data });
  } catch (err) {
    console.error('Error fetching bootstrap data:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Services API
app.post('/api/services', (req, res) => {
  try {
    const {
      title,
      category,
      description = '',
      duration = '60 دقيقة',
      price,
      old_price = null,
      is_promo = 0,
      sort_order = 0
    } = req.body;

    if (!title || !category || price === undefined) {
      return res.status(400).json({ success: false, error: 'Title, category, and price are required' });
    }

    const insertStmt = db.prepare(`
      INSERT INTO services (title, category, description, duration, price, old_price, is_promo, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const parsedPrice = parseInt(price, 10);
    const parsedOldPrice = old_price ? parseInt(old_price, 10) : null;
    const parsedPromo = is_promo ? 1 : 0;
    const parsedSort = parseInt(sort_order, 10) || 0;

    const result = insertStmt.run(
      title.trim(),
      category.trim(),
      description.trim(),
      duration.trim(),
      parsedPrice,
      parsedOldPrice,
      parsedPromo,
      parsedSort
    );

    const newService = db.prepare('SELECT * FROM services WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ success: true, service: newService });
  } catch (err) {
    console.error('Error creating service:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/api/services/:id', (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM services WHERE id = ?').get(id);

    if (!existing) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    const fields = ['title', 'category', 'description', 'duration', 'price', 'old_price', 'is_promo', 'sort_order'];
    const updates = [];
    const values = [];

    for (const field of fields) {
      if (req.body[field] !== undefined) {
        updates.push(`${field} = ?`);
        let val = req.body[field];
        if (field === 'price' || field === 'sort_order') {
          val = parseInt(val, 10);
        } else if (field === 'old_price') {
          val = val !== null && val !== '' ? parseInt(val, 10) : null;
        } else if (field === 'is_promo') {
          val = val ? 1 : 0;
        }
        values.push(val);
      }
    }

    if (updates.length === 0) {
      return res.json({ success: true, service: existing });
    }

    values.push(id);
    const query = `UPDATE services SET ${updates.join(', ')} WHERE id = ?`;
    db.prepare(query).run(...values);

    const updated = db.prepare('SELECT * FROM services WHERE id = ?').get(id);
    res.json({ success: true, service: updated });
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/services/:id', (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM services WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Gallery API
app.post('/api/gallery', (req, res) => {
  try {
    const { title, subtitle = '', category = 'العناية بالبشرة', image_url } = req.body;
    if (!title || !image_url) {
      return res.status(400).json({ success: false, error: 'Title and image_url are required' });
    }

    const result = db.prepare(`
      INSERT INTO gallery (title, subtitle, category, image_url)
      VALUES (?, ?, ?, ?)
    `).run(title.trim(), subtitle.trim(), category.trim(), image_url.trim());

    const item = db.prepare('SELECT * FROM gallery WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ success: true, item });
  } catch (err) {
    console.error('Error adding gallery item:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/gallery/:id', (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM gallery WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Gallery item not found' });
    }
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (err) {
    console.error('Error deleting gallery item:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Settings API
app.patch('/api/settings', (req, res) => {
  try {
    const upsertStmt = db.prepare(`
      INSERT INTO settings (key, value)
      VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `);

    const updateMany = db.transaction((settingsObj) => {
      for (const [key, val] of Object.entries(settingsObj)) {
        upsertStmt.run(key, String(val));
      }
    });

    updateMany(req.body);

    const rows = db.prepare('SELECT key, value FROM settings').all();
    const settings = {};
    for (const r of rows) {
      settings[r.key] = r.value;
    }

    res.json({ success: true, settings });
  } catch (err) {
    console.error('Error updating settings:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Multer Local File Upload API
const multer = require('multer');
const uploadDir = path.join(__dirname, '..', 'public', 'media', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = Date.now() + '-' + Math.round(Math.random() * 1E6) + ext;
    cb(null, safeName);
  }
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

app.post('/api/upload', upload.single('mediaFile'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    const publicUrl = `/media/uploads/${req.file.filename}`;
    res.json({ success: true, url: publicUrl, size: req.file.size });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Reels API
app.post('/api/reels', (req, res) => {
  try {
    const { title, category = 'العناية بالبشرة', video_url, poster_url = '', instagram_permalink = '', sort_order = 0 } = req.body;
    if (!title || !video_url) {
      return res.status(400).json({ success: false, error: 'Title and video_url are required' });
    }
    const result = db.prepare(`
      INSERT INTO reels (title, category, video_url, poster_url, instagram_permalink, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(title.trim(), category.trim(), video_url.trim(), poster_url.trim(), instagram_permalink.trim(), Number(sort_order) || 0);

    const newReel = db.prepare('SELECT * FROM reels WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ success: true, reel: newReel });
  } catch (err) {
    console.error('Error creating reel:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/reels/:id', (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM reels WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Reel not found' });
    }
    res.json({ success: true, message: 'Reel deleted successfully' });
  } catch (err) {
    console.error('Error deleting reel:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Instagram Posts API
app.post('/api/instagram_posts', (req, res) => {
  try {
    const { title, category = 'نتائج البشرة', image_url, caption = '', likes_count = 250, date_posted = 'الآن', permalink = '' } = req.body;
    if (!title || !image_url) {
      return res.status(400).json({ success: false, error: 'Title and image_url are required' });
    }
    const result = db.prepare(`
      INSERT INTO instagram_posts (title, category, image_url, caption, likes_count, date_posted, permalink)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(title.trim(), category.trim(), image_url.trim(), caption.trim(), Number(likes_count) || 250, date_posted.trim(), permalink.trim());

    const newPost = db.prepare('SELECT * FROM instagram_posts WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    console.error('Error creating instagram post:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/instagram_posts/:id', (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM instagram_posts WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.json({ success: true, message: 'Instagram post deleted successfully' });
  } catch (err) {
    console.error('Error deleting instagram post:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Backup SQLite database endpoint
app.get('/api/backup', (req, res) => {
  try {
    const dbFilePath = path.join(__dirname, '..', 'data', 'joven.db');
    if (!fs.existsSync(dbFilePath)) {
      return res.status(404).json({ success: false, error: 'Database file not found' });
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    res.download(dbFilePath, `joven_backup_${timestamp}.db`);
  } catch (err) {
    console.error('Error generating backup:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Admin dashboard route
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
});

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

function listenOnAvailablePort(startPort) {
  const server = app.listen(startPort, () => {
    console.log(`✨ JOVEN Institut Server running at http://localhost:${startPort}`);
    try {
      fs.writeFileSync(path.join(__dirname, '..', 'data', 'active_port.txt'), String(startPort));
    } catch (e) {}
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${startPort} is in use, attempting port ${startPort + 1}...`);
      listenOnAvailablePort(startPort + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

listenOnAvailablePort(Number(PORT) || 3000);
