document.getElementById("image").addEventListener("change", function (event) {
  const preview = document.getElementById("preview");
  const file = event.target.files[0];

  if (file) {
    const render = new FileReader();
    render.onload = function (e) {
      preview.src = e.target.result;
      preview.classList.remove("d-none");
    };
    render.readAsDataURL(file);
  } else {
    preview.src = "#";
    preview.classList.add("d-none");
  }
});
