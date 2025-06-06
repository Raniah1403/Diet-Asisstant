# Diet Assistant

**CalorieChatbot** adalah aplikasi web interaktif untuk membantu pengguna:

- Mendapatkan rekomendasi **resep diet sehat** melalui chatbot AI
- Menghitung **BMI (Body Mass Index)**
- Membaca **berita kesehatan/diet** terkini

## Fitur Utama

- Chatbot cerdas (terhubung Gemini API Google)
- Kalkulator BMI interaktif
- Berita kesehatan/diet dari GNews API (otomatis, gambar & deskripsi tampil responsif)
- Tampilan modern, responsif, dan konsisten di semua halaman (beranda, chatbot, BMI, berita, about)
- UI/UX mobile friendly: layout, gambar, dan komponen utama tetap rapi di berbagai ukuran layar

## Teknologi yang Digunakan

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **API:** Google Gemini, GNews
- **Lainnya:** dotenv, emoji picker, file upload, CORS

## Cara Menjalankan

1. Clone repo ini
2. Install dependencies: `npm install`
3. Buat file `.env` dengan isi:
   ```env
   GNEWS_API_KEY=xxx
   GEMINI_API_KEY=xxx
   ```
4. Jalankan server: `node server.js`
5. Buka di browser: `http://localhost:3000`

## Panduan Penggunaan Website

- **Beranda:**
  - Hero section dengan gambar dan efek lingkaran, otomatis responsif (gambar disembunyikan di mobile)
  - Navigasi ke semua fitur
- **Chatbot:**
  - Konsultasi diet, tanya kalori, upload gambar makanan
  - Input teks & gambar, emoji picker
- **Kalkulator BMI:**
  - Masukkan data, klik hitung, hasil & kategori BMI muncul
- **Berita:**
  - Berita kesehatan/diet/olahraga/nutrisi dari GNews API
  - Card berita modern, gambar & deskripsi tampil, responsif di mobile
- **About:**
  - Penjelasan singkat fitur dan misi website

## Perubahan Terbaru

- Tampilan modern & konsisten di semua halaman
- Hero section, feature row, info-cards, mission section responsif
- Card berita lebih ramping, gambar otomatis tampil jika ada
- Semua layout, gambar, dan komponen utama sudah rapi di mobile
- Fetch berita dari backend, fallback otomatis ke bahasa Inggris jika tidak ada hasil Indonesia
- Semua script JS sudah dipisah per fitur

---
