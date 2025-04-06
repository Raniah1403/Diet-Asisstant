import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static('public')); // supaya html bisa diakses

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

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

    //Cek kalau bukan response.ok
    if (!response.ok || !contentType.includes('application/json')) {
      const text = await response.text(); // Bisa jadi HTML error page
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

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
