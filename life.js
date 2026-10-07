const photoDialog = document.getElementById("photo-dialog");
const dialogImage = document.getElementById("dialog-image");
const dialogTitle = document.getElementById("dialog-title");

document.querySelectorAll(".photo-open").forEach(button => {
  button.addEventListener("click", () => {
    const source = button.querySelector("img");
    dialogImage.src = source.src;
    dialogImage.alt = source.alt;
    dialogTitle.textContent = button.closest("figure").querySelector("h3").textContent;
    photoDialog.showModal();
  });
});
photoDialog.addEventListener("click", event => {
  if (event.target !== photoDialog) return;
  const bounds = photoDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) photoDialog.close();
});
