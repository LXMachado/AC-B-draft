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
