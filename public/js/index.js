const modal = document.getElementById("helpModal");
const btn = document.getElementById("helpBtn");
const span = document.getElementsByClassName("close")[0];

// Saat tombol ? diklik
btn.onclick = function () {
  modal.style.display = "flex";
  document.body.classList.add("modal-open");
}

// Saat tanda silang diklik
span.onclick = function () {
  modal.style.display = "none";
  document.body.classList.remove("modal-open");
}

// Saat klik di luar modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
}