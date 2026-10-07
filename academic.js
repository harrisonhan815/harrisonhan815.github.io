// The personal-page entry is temporarily a notice button, with no navigation.
(() => {
  const button = document.getElementById("personal-life-button");
  const notice = document.getElementById("construction-toast");
  if (!button || !notice) return;
  let timeout;
  const updateMessage = () => {
    const language = document.documentElement.lang === "en" ? "en" : "zh";
    notice.textContent = window.pageTranslations[language].underConstruction;
  };
  button.addEventListener("click", () => {
    clearTimeout(timeout);
    notice.hidden = false;
    updateMessage();
    timeout = setTimeout(() => {
      notice.hidden = true;
      notice.textContent = "";
    }, 2000);
  });
  document.querySelectorAll("[data-lang]").forEach(control => {
    control.addEventListener("click", () => {
      if (!notice.hidden) updateMessage();
    });
  });
})();
