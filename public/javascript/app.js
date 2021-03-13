// mobile NAVBAR
const navLinks = document.querySelectorAll(".nav-links")[0];
const burger = document.querySelector(".burger");
const backgroundNav = document.getElementsByClassName("background-nav")[0];

burger.addEventListener("click", function (e) {
  navLinks.classList.toggle("nav-active");
  burger.classList.toggle("burger-active");

  backgroundNav.classList.toggle("nav-background-active");
  document.body.classList.toggle("stop-scroll");
});

// Scroll to top
const toTop = document.getElementsByClassName("to-top")[0];

window.onscroll = function () {
  scrollToTop();
};

function scrollToTop() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    // toTop.classList.toggle("to-top-active");
    toTop.style.opacity = "1";
    toTop.style.transition = "all 0.3s ease";
    toTop.style.cursor = "pointer";
  } else {
    toTop.style.opacity = "0";
    toTop.style.pointerEvent = "none";
    toTop.style.cursor = "auto";
  }
}

toTop.addEventListener("click", () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
