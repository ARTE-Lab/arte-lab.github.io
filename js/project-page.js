const initProjectCopyButtons = () => {
  const buttons = document.querySelectorAll("[data-copy-target]");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const targetId = button.dataset.copyTarget;
      const target = document.getElementById(targetId);
      if (!target) return;

      const originalLabel = button.querySelector("span");
      const originalText = originalLabel ? originalLabel.textContent : "";

      try {
        await navigator.clipboard.writeText(target.textContent.trim());
        if (originalLabel) originalLabel.textContent = "Copied";
        button.classList.add("is-copied");
      } catch (error) {
        if (originalLabel) originalLabel.textContent = "Copy failed";
      }

      window.setTimeout(() => {
        if (originalLabel) originalLabel.textContent = originalText;
        button.classList.remove("is-copied");
      }, 1800);
    });
  });
};

const updateCarousel = (carousel, nextIndex) => {
  const items = Array.from(carousel.querySelectorAll("[data-carousel-item]"));
  const dots = Array.from(carousel.parentElement.querySelectorAll("[data-carousel-dot]"));
  if (!items.length) return;

  items.forEach((item, index) => {
    item.classList.toggle("is-active", index === nextIndex);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === nextIndex);
  });

  carousel.dataset.index = String(nextIndex);
};

const initProjectCarousels = () => {
  const carousels = document.querySelectorAll("[data-carousel]");
  if (!carousels.length) return;

  carousels.forEach((carousel) => {
    const items = Array.from(carousel.querySelectorAll("[data-carousel-item]"));
    if (!items.length) return;

    let index = 0;
    carousel.dataset.index = "0";
    updateCarousel(carousel, 0);

    const prev = carousel.parentElement.querySelector("[data-carousel-prev]");
    const next = carousel.parentElement.querySelector("[data-carousel-next]");
    const dots = Array.from(carousel.parentElement.querySelectorAll("[data-carousel-dot]"));

    if (prev) {
      prev.addEventListener("click", () => {
        index = (index - 1 + items.length) % items.length;
        updateCarousel(carousel, index);
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        index = (index + 1) % items.length;
        updateCarousel(carousel, index);
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        index = Number(dot.dataset.carouselDot);
        updateCarousel(carousel, index);
      });
    });
  });
};

const initProjectDropdowns = () => {
  const toggles = document.querySelectorAll("[data-dropdown-toggle]");
  if (!toggles.length) return;

  toggles.forEach((toggle) => {
    const panel = toggle.closest(".project_panel")?.querySelector("[data-dropdown-panel]");
    if (!panel) return;

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
      panel.hidden = expanded;
    });
  });
};

window.addEventListener("load", () => {
  initProjectCopyButtons();
  initProjectCarousels();
  initProjectDropdowns();
});
