import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static('public')); 

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

// Route untuk menerima request dari frontend dan teruskan ke Gemini API
app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const contentType = response.headers.get('content-type');
    console.log("CONTENT-TYPE:", contentType);

    if (!response.ok || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error("ERROR DETAIL:", text);
      return res.status(500).json({ error: 'Respon dari Gemini API gagal atau tidak dalam format JSON.' });
    }

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mendapatkan respon dari Gemini API' });
  }
});

// Endpoint untuk mengambil berita dari GNews
app.get('/api/news', async (req, res) => {
  try {
    const GNEWS_API_KEY = process.env.GNEWS_API_KEY || 'ISI_API_KEY_GNEWS_ANDA';
    const query = encodeURIComponent('kesehatan OR diet OR olahraga OR nutrisi');
    const url = `https://gnews.io/api/v4/search?q=${query}&lang=id&country=id&token=${GNEWS_API_KEY}&max=10`;
    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      console.error('GNews API ERROR:', text);
      return res.status(500).json({ articles: [], error: 'Gagal mengambil berita dari GNews' });
    }
    const data = await response.json();
    if (!data.articles || data.articles.length === 0) {
      const fallbackUrl = `https://gnews.io/api/v4/search?q=${query}&lang=en&token=${GNEWS_API_KEY}&max=10`;
      const fallbackRes = await fetch(fallbackUrl);
      const fallbackData = await fallbackRes.json();
      return res.json({ articles: fallbackData.articles || [] });
    }
    res.json({ articles: data.articles || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ articles: [], error: 'Gagal mengambil berita dari GNews' });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
