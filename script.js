const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#mobile-menu");
const menuLinks = menu.querySelectorAll("a");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menu.hidden = isOpen;
  document.body.classList.toggle("menu-open", !isOpen);
});
menuLinks.forEach((link) =>
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menu.hidden = true;
    document.body.classList.remove("menu-open");
  }),
);

const quoteDialog = document.querySelector("#quote-dialog");
const quoteForm = document.querySelector("#quote-form");
const quoteSuccess = document.querySelector("#form-success");
const quoteClose = document.querySelector(".quote-close");
const quoteSteps = [...document.querySelectorAll(".quote-step")];
const quoteNext = document.querySelector(".step-next");
const quoteBack = document.querySelector(".step-back");
let activeStep = 1;
let quoteOpener = null;

const showQuoteStep = (step) => {
  activeStep = step;
  quoteSteps.forEach((section) => {
    const active = Number(section.dataset.step) === step;
    section.hidden = !active;
    section.classList.toggle("is-active", active);
  });
  quoteBack.hidden = step === 1;
  quoteNext.textContent = step === 5 ? "Request My Quote" : "Continue";
  quoteNext.type = step === 5 ? "submit" : "button";
  document.querySelector("#quote-title, .quote-step.is-active h2")?.focus?.();
};

const openQuote = (opener) => {
  quoteOpener = opener;
  if (!quoteSuccess.hidden) {
    quoteSuccess.hidden = true;
    quoteForm.hidden = false;
    quoteForm.reset();
  }
  quoteDialog.hidden = false;
  document.body.classList.add("quote-open");
  showQuoteStep(1);
  window.setTimeout(() => document.querySelector("#first-name").focus(), 0);
};

const closeQuote = () => {
  quoteDialog.hidden = true;
  document.body.classList.remove("quote-open");
  quoteOpener?.focus();
};

document.querySelectorAll("[data-open-quote]").forEach((link) =>
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openQuote(link);
  }),
);
quoteClose.addEventListener("click", closeQuote);
quoteDialog.addEventListener("click", (event) => {
  if (event.target === quoteDialog) closeQuote();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !quoteDialog.hidden) closeQuote();
});
quoteNext.addEventListener("click", () => {
  if (activeStep < 5) {
    const step = quoteSteps[activeStep - 1];
    const fields = [...step.querySelectorAll("input[required]")];
    if (!fields.every((field) => field.checkValidity())) {
      fields.find((field) => !field.checkValidity())?.reportValidity();
      return;
    }
    showQuoteStep(activeStep + 1);
  }
});
quoteBack.addEventListener("click", () => showQuoteStep(activeStep - 1));
quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  quoteForm.hidden = true;
  quoteSuccess.hidden = false;
  quoteSuccess.focus();
});

const reviewSlider = document.querySelector("[data-review-slider]");
if (reviewSlider) {
  const track = reviewSlider.querySelector(".review-track");
  const slides = [...reviewSlider.querySelectorAll(".review-slide")];
  const dots = [...reviewSlider.querySelectorAll("[data-review-dot]")];
  const desktopReviews = window.matchMedia("(min-width: 720px)");
  let currentReview = 0;

  const showReview = (index) => {
    currentReview = (index + slides.length) % slides.length;
    track.style.transform = desktopReviews.matches
      ? "none"
      : `translateX(-${currentReview * 100}%)`;
    dots.forEach((dot, dotIndex) =>
      dot.setAttribute("aria-selected", String(dotIndex === currentReview)),
    );
  };

  dots.forEach((dot, index) =>
    dot.addEventListener("click", () => showReview(index)),
  );
  desktopReviews.addEventListener("change", () => showReview(currentReview));

  let touchStartX = 0;
  reviewSlider.addEventListener(
    "touchstart",
    (event) => (touchStartX = event.changedTouches[0].screenX),
    { passive: true },
  );
  reviewSlider.addEventListener(
    "touchend",
    (event) => {
      const distance = event.changedTouches[0].screenX - touchStartX;
      if (Math.abs(distance) > 45 && !desktopReviews.matches) {
        showReview(currentReview + (distance < 0 ? 1 : -1));
      }
    },
    { passive: true },
  );
}
