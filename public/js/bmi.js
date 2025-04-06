document.addEventListener("DOMContentLoaded", function () {
  const bmiForm = document.getElementById("bmiForm");
  const resultCard = document.getElementById("resultCard");
  const bmiResult = document.getElementById("bmiResult");
  const bmiCategory = document.getElementById("bmiCategory");
 
  bmiForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100;
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;

    // Validate inputs
    if (isNaN(weight)) {
      showError("Masukkan berat badan yang valid");
      return;
    }

    if (isNaN(height)) {
      showError("Masukkan tinggi badan yang valid");
      return;
    }

    if (isNaN(age)) {
      showError("Masukkan usia yang valid");
      return;
    }

    if (!gender) {
      showError("Pilih jenis kelamin");
      return;
    }

    // Calculate BMI
    const bmi = weight / (height * height);
    const roundedBMI = Math.round(bmi * 10) / 10;

    // Determine category
    let category, categoryClass;
    if (bmi < 18.5) {
      category = "Kurus (Underweight)";
      categoryClass = "underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal (Healthy Weight)";
      categoryClass = "normal";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Gemuk (Overweight)";
      categoryClass = "overweight";
    } else {
      category = "Obesitas (Obese)";
      categoryClass = "obese";
    }

    // Display results
    bmiResult.textContent = roundedBMI;
    bmiCategory.textContent = category;
    bmiCategory.className = "bmi-category " + categoryClass;

    // Show personalized advice
    showPersonalizedAdvice(categoryClass, roundedBMI, gender, age);

    // Show result card with animation
    resultCard.style.display = "block";
    setTimeout(() => {
      resultCard.style.opacity = "1";
      resultCard.style.transform = "translateY(0)";
    }, 10);

    // Scroll to results
    resultCard.scrollIntoView({ behavior: "smooth" });
  });

  function showError(message) {
    alert(message);
  }

  function showPersonalizedAdvice(categoryClass, bmiValue, gender, age) {
    const adviceContainer = document.getElementById("personalizedAdvice");
    let adviceHTML = "";

    switch (categoryClass) {
      case "underweight":
        adviceHTML = `
            <div class="advice-section">
              <h3>💡 Tips untuk Menaikkan Berat Badan Secara Sehat</h3>
              <p>BMI Anda ${bmiValue} menunjukkan berat badan kurang. Berikut rekomendasi kami:</p>
              <ul class="advice-list">
                <li><strong>🍳 Tingkatkan asupan kalori</strong> secara bertahap dengan makanan padat nutrisi</li>
                <li><strong>🥑 Konsumsi lemak sehat</strong> dari alpukat, kacang-kacangan, dan minyak zaitun</li>
                <li><strong>🍗 Protein berkualitas</strong> seperti ayam, ikan, telur, dan daging tanpa lemak</li>
                <li><strong>🏋️‍♀️ Latihan kekuatan</strong> untuk membangun massa otot, bukan hanya lemak</li>
                <li><strong>⏱ Makan lebih sering</strong> 5-6 kali sehari dengan porsi kecil</li>
              </ul>
              <div class="recipe-suggestion">
                <h4>🍽️ Rekomendasi Menu Sehari:</h4>
                <p><strong>Sarapan:</strong> Oatmeal dengan pisang, kacang almond, dan madu + susu full cream</p>
                <p><strong>Camilan:</strong> Roti gandum dengan selai kacang + jus alpukat</p>
                <p><strong>Makan Siang:</strong> Nasi merah, dada ayam panggang, sayuran dengan minyak zaitun</p>
                <p><strong>Camilan Sore:</strong> Yogurt Yunani dengan granola dan buah beri</p>
                <p><strong>Makan Malam:</strong> Salmon panggang, kentang tumbuk, brokoli kukus</p>
              </div>
            </div>
          `;
        break;

      case "normal":
        adviceHTML = `
            <div class="advice-section">
              <h3>🎉 Selamat! Berat Badan Anda Ideal</h3>
              <p>BMI Anda ${bmiValue} berada dalam range normal. Pertahankan dengan:</p>
              <ul class="advice-list">
                <li><strong>🥗 Pola makan seimbang</strong> dengan gizi lengkap</li>
                <li><strong>🚴‍♂️ Aktivitas fisik rutin</strong> 150 menit/minggu</li>
                <li><strong>💧 Minum air putih</strong> cukup (8 gelas/hari)</li>
                <li><strong>😴 Tidur berkualitas</strong> 7-8 jam setiap malam</li>
                <li><strong>🧘 Manajemen stres</strong> dengan meditasi atau hobi</li>
              </ul>
              <div class="recipe-suggestion">
                <h4>🍽️ Ide Menu Seimbang:</h4>
                <p><strong>Sarapan:</strong> Smoothie bowl (pisang, bayam, yogurt, chia seed) + telur rebus</p>
                <p><strong>Makan Siang:</strong> Nasi merah, tempe/tahu, sayuran, sup ayam</p>
                <p><strong>Makan Malam:</strong> Ikan bakar, ubi jalar, salad sayur dengan dressing lemon</p>
                <p><strong>Camilan:</strong> Buah segar atau kacang-kacangan tanpa garam</p>
              </div>
              <p class="motivation">"Kesehatan yang baik bukanlah tentang berat badan sempurna, tapi tentang kebiasaan sehat yang konsisten!"</p>
            </div>
          `;
        break;

      case "overweight":
        adviceHTML = `
            <div class="advice-section">
              <h3>⚖️ Tips untuk Menurunkan Berat Badan Secara Sehat</h3>
              <p>BMI Anda ${bmiValue} menunjukkan berat badan berlebih. Rekomendasi kami:</p>
              <ul class="advice-list">
                <li><strong>🥦 Fokus pada makanan utuh</strong> - sayuran, buah, biji-bijian</li>
                <li><strong>🚫 Kurangi gula tambahan</strong> dan makanan olahan</li>
                <li><strong>🏃 Latihan kardio</strong> 30 menit/hari seperti jalan cepat atau bersepeda</li>
                <li><strong>🍽️ Kontrol porsi makan</strong> dengan piring kecil</li>
                <li><strong>📊 Catat makanan</strong> untuk meningkatkan kesadaran</li>
              </ul>
              <div class="recipe-suggestion">
                <h4>🍽️ Rekomendasi Menu Sehari:</h4>
                <p><strong>Sarapan:</strong> Telur dadar dengan bayam dan jamur + 1 slice roti gandum</p>
                <p><strong>Camilan:</strong> Apel dengan 1 sendok selai kacang</p>
                <p><strong>Makan Siang:</strong> Salad quinoa dengan ayam panggang dan sayuran</p>
                <p><strong>Camilan Sore:</strong> Wortel dan mentimun dengan hummus</p>
                <p><strong>Makan Malam:</strong> Sup sayur dengan daging tanpa lemak</p>
              </div>
              <p class="warning">⚠️ Penurunan berat badan ideal adalah 0.5-1 kg per minggu</p>
            </div>
          `;
        break;

      case "obese":
        adviceHTML = `
            <div class="advice-section">
              <h3>🩺 Rekomendasi Kesehatan untuk Obesitas</h3>
              <p>BMI Anda ${bmiValue} termasuk dalam kategori obesitas. Kami sarankan:</p>
              <ul class="advice-list">
                <li><strong>👨‍⚕️ Konsultasi dokter</strong> untuk pemeriksaan kesehatan menyeluruh</li>
                <li><strong>📉 Defisit kalori moderat</strong> 500-750 kcal/hari</li>
                <li><strong>🚶 Mulai dengan aktivitas ringan</strong> seperti jalan kaki 10 menit, 3x sehari</li>
                <li><strong>🥦 Tingkatkan serat</strong> untuk rasa kenyang lebih lama</li>
                <li><strong>🧠 Terapi perilaku</strong> untuk mengubah kebiasaan makan</li>
              </ul>
              <div class="recipe-suggestion">
                <h4>🍽️ Contoh Makanan Sehat:</h4>
                <p><strong>Sarapan:</strong> Oatmeal dengan kayu manis dan pir</p>
                <p><strong>Makan Siang:</strong> Salad dengan sayuran hijau, dada ayam tanpa kulit, dan minyak zaitun</p>
                <p><strong>Makan Malam:</strong> Ikan putih kukus dengan brokoli dan wortel</p>
                <p><strong>Camilan:</strong> Yoghurt tanpa lemak dengan flaxseed</p>
              </div>
              <div class="important-note">
                <h4>💊 Pertimbangan Kesehatan:</h4>
                <p>Obesitas meningkatkan risiko: diabetes tipe 2, tekanan darah tinggi, penyakit jantung, dan masalah sendi. Segera konsultasikan dengan profesional kesehatan.</p>
              </div>
            </div>
          `;
        break;
    }

    // Add gender-specific advice if needed
    if (gender === "male") {
      adviceHTML += `<p class="gender-note">💪 Untuk pria: Fokus pada latihan kekuatan untuk meningkatkan metabolisme.</p>`;
    } else if (gender === "female") {
      adviceHTML += `<p class="gender-note">🌸 Untuk wanita: Perhatikan asupan kalsium dan zat besi yang cukup.</p>`;
    }

    // Add age-specific advice
    if (age > 40) {
      adviceHTML += `<p class="age-note">🕒 Di atas 40 tahun: Perhatikan kesehatan tulang dan pemeriksaan kesehatan rutin.</p>`;
    }

    adviceContainer.innerHTML = adviceHTML;
  }

  // Input validation
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (this.validity.rangeUnderflow) {
        this.setCustomValidity(`Nilai minimal adalah ${this.min}`);
      } else if (this.validity.rangeOverflow) {
        this.setCustomValidity(`Nilai maksimal adalah ${this.max}`);
      } else {
        this.setCustomValidity("");
      }
    });
  });
});
