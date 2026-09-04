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

const form = document.querySelector("#quote-form");
const success = document.querySelector("#form-success");
const error = document.querySelector("#form-error");
const reset = document.querySelector(".reset-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const interests = form.querySelectorAll(
    'input[name="interest"]:checked',
  ).length;
  if (!form.checkValidity() || !interests) {
    error.hidden = false;
    form.reportValidity();
    return;
  }
  error.hidden = true;
  form.hidden = true;
  success.hidden = false;
  success.focus();
});
form.addEventListener("input", () => (error.hidden = true));
reset.addEventListener("click", () => {
  success.hidden = true;
  form.hidden = false;
  form.reset();
  document.querySelector("#name").focus();
});

const reviewSlider = document.querySelector("[data-review-slider]");
if (reviewSlider) {
  const track = reviewSlider.querySelector(".review-track");
  const slides = [...reviewSlider.querySelectorAll(".review-slide")];
  const dots = [...reviewSlider.querySelectorAll("[data-review-dot]")];
  let currentReview = 0;

  const showReview = (index) => {
    currentReview = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentReview * 100}%)`;
    dots.forEach((dot, dotIndex) =>
      dot.setAttribute("aria-selected", String(dotIndex === currentReview)),
    );
  };

  reviewSlider
    .querySelector("[data-review-previous]")
    .addEventListener("click", () => showReview(currentReview - 1));
  reviewSlider
    .querySelector("[data-review-next]")
    .addEventListener("click", () => showReview(currentReview + 1));
  dots.forEach((dot, index) =>
    dot.addEventListener("click", () => showReview(index)),
  );
}
