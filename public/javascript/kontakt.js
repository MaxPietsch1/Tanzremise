const contactInfo = document.getElementsByClassName("contact-information")[0];
const contactInfoBtn = document.getElementsByClassName(
  "contact-info-wrapper"
)[0];
const contactWrapper = document.getElementsByClassName("contact-wrapper")[0];
const pointer = document.getElementsByClassName("fa-angle-right")[0];
const button = document.getElementsByClassName("contact-button")[0].children[1];

contactInfoBtn.addEventListener("click", function () {
  contactInfo.classList.toggle("contact-information-active");
  contactWrapper.classList.toggle("contact-wrapper-active");
  pointer.classList.toggle("contact-pointer-active");
  button.classList.toggle("button-active");
});
