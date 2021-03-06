// Ensemble rotating cards
const cardWrapper = document.querySelector(".ensemble-main").children;
const cards = document.querySelectorAll(".card");
const cardBackside = document.querySelector(".profile-card-back");
const cardInner = document.querySelectorAll(".card-rotate");
const turnButton = document.getElementsByClassName("turn-card")[0];
const openCard = document.getElementsByClassName("open-card");
// console.log(openCard.children[0]);

for (let i = 0; i < cards.length; i++) {
  cards[i].children[0].addEventListener(
    "click",
    function turnCard(e) {
      this.classList.toggle("rotate-active-two");
      openCard[i].classList.toggle("open-card-deactive");
    },
    false
  );
  // console.log(cards[i].children[0]);
  // console.log(openCard[i]);

  openCard[i].addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      cards[i].classList.toggle("card-active");
      if (openCard[i].children[0].innerHTML === "Karte öffnen") {
        openCard[i].children[0].innerHTML = "Karte schließen";
      } else if ((innerHTML = "Karte schließen")) {
        openCard[i].children[0].innerHTML = "Karte öffnen";
      }
    },
    false
  );

  const backsideText = cards[i].children[0].children[1].children[1].children[0];
  cards[i].children[0].addEventListener("click", function addScroll() {
    setTimeout(function () {
      backsideText.classList.toggle("backside-text-wrapper-active");
    }, 200);
  });
}

// Show images onclick
function show() {
  const images = document.querySelectorAll("#id1 img");
  for (let i = 0; i < images.length; i++) {
    images[i].src = images[i].getAttribute("data-src");
    images[i].classList.add("class2");
  }
}

// NEW-CARD-SECTION
const newCard = document.getElementsByClassName("new-card");
const newText = document.getElementsByClassName("new-text-content");
const moreText = document.getElementsByClassName("more-text");
const about = document.getElementsByClassName("about-essen");
const newBtn = document.getElementsByClassName("new-button");
const extraText = document.getElementsByClassName("extra-text");

for (let i = 0; i < newCard.length; i++) {
  newBtn[i].addEventListener("click", function () {
    newText[i].classList.toggle("new-text-content-active");
    moreText[i].classList.toggle("more-text-active");
    newCard[i].classList.toggle("new-card-active");
    extraText[i].classList.toggle("extra-text-active");

    if (this.innerHTML === "READ MORE") {
      newBtn[i].innerHTML = "READ LESS";
    } else {
      newBtn[i].innerHTML = "READ MORE";
    }
  });
}
