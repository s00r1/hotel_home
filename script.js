document.addEventListener("DOMContentLoaded", () => {
  // ... Animation 3D, ripple, etc. (tu touches pas, garde ce qui marche) ...

  const popover = document.getElementById("preview-popover");
  const previewFrame = document.getElementById("preview-frame");
  const buttons = document.querySelectorAll(".card-button");

  let isOverButton = false;
  let isOverPopover = false;
  let closeTimeout;

  buttons.forEach((button) => {
    const url = button.getAttribute("data-preview") || null;

    if (url) {
      button.addEventListener("mouseenter", (e) => {
        isOverButton = true;
        clearTimeout(closeTimeout);
        previewFrame.src = url;
        popover.style.display = "block";

        // Positionner le popover à côté du bouton
        const rect = button.getBoundingClientRect();
        const popW = 360, popH = 380;
        let top = rect.top + window.scrollY - 10;
        let left = rect.right + 10 + window.scrollX;

        // Si trop à droite, bascule à gauche
        if (left + popW > window.innerWidth) {
          left = rect.left - popW - 10 + window.scrollX;
        }
        // Si trop bas, remonte
        if (top + popH > window.innerHeight) {
          top = window.innerHeight - popH - 10 + window.scrollY;
        }
        if (top < 0) top = 10 + window.scrollY;

        popover.style.top = `${top}px`;
        popover.style.left = `${left}px`;
      });

      button.addEventListener("mouseleave", () => {
        isOverButton = false;
        closeTimeout = setTimeout(() => {
          if (!isOverPopover) {
            popover.style.display = "none";
            previewFrame.src = "";
          }
        }, 20);
      });
    }
  });

  popover.addEventListener("mouseenter", () => {
    isOverPopover = true;
    clearTimeout(closeTimeout);
  });

  popover.addEventListener("mouseleave", () => {
    isOverPopover = false;
    closeTimeout = setTimeout(() => {
      if (!isOverButton) {
        popover.style.display = "none";
        previewFrame.src = "";
      }
    }, 20);
  });
});
