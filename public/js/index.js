const modal = document.getElementById("helpModal");
  const btn = document.getElementById("helpBtn");
  const span = document.getElementsByClassName("close")[0];

  btn.onclick = function () {
    modal.style.display = "flex";
  }

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }