// Mendapatkan berita dari backend (pastikan endpoint /api/news sudah ada di server.js)
document.addEventListener("DOMContentLoaded", async function () {
    const newsList = document.getElementById("news-list");
    if (!newsList) return;
    newsList.innerHTML =
        '<div style="text-align:center; color:#6bc2ff;">Memuat berita...</div>';
    try {
        const res = await fetch("/api/news");
        const data = await res.json();
        if (!data.articles || data.articles.length === 0) {
            newsList.innerHTML =
                '<div style="text-align:center; color:#f36578;">Tidak ada berita ditemukan.</div>';
            return;
        }
        newsList.innerHTML = "";
        data.articles.forEach((article) => {
            const card = document.createElement("div");
            card.className = "news-card";
            card.onclick = () => window.open(article.url, "_blank");
            card.innerHTML = `
        ${article.image
                    ? `<img src="${article.image}" alt="news image" class="news-img" style="width:100%;max-height:220px;object-fit:cover;border-radius:12px;margin-bottom:12px;">`
                    : ""
                }
        <a class="news-title" href="${article.url}" target="_blank">${article.title
                }</a>
        <div class="news-meta">${article.source.name} &bull; ${new Date(
                    article.publishedAt
                ).toLocaleDateString("id-ID")}</div>
        <div class="news-desc">${article.description || ""}</div>
        <span class="news-link">Baca Selengkapnya</span>
      `;
            newsList.appendChild(card);
        });
    } catch (err) {
        newsList.innerHTML =
            '<div style="text-align:center; color:#f36578;">Gagal memuat berita.</div>';
    }
});
