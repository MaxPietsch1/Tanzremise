function buildLightBox() {
  const images = document.getElementsByClassName("lazy-images");
  // const lazyWrapper = document.getElementsByClassName("lazy-gallery")[0];

  const imgBackground = document.createElement("div");
  const xBtn = document.createElement("button");
  xBtn.innerHTML = "X";
  for (let i = 0; i < images.length; i++) {
    const children = images[i].children;
    for (let i = 0; i < children.length; i++) {
      children[i].addEventListener("click", function myFunction() {
        xBtn.classList.toggle("close-image");
        imgBackground.appendChild(xBtn);

        xBtn.addEventListener("click", () => {
          this.classList.remove("lazy-image-active");
          xBtn.classList.remove("close-image");
          imgBackground.classList.remove("lazyload-wrapper-active");
          document.body.classList.remove("stop-scroll");
        });

        this.classList.toggle("lazy-image-active");
        imgBackground.classList.toggle("lazyload-wrapper-active");
        document.body.append(imgBackground);
        // Gallerie stop scroll image not working
        document.body.classList.toggle("stop-scroll");
      });
    }
  }
}

// Pagination
// If scrollposition is between 100 - 200, display array index [0-50]. Between 200 - 300 , display array index [50 - 100]
// Style, empty colored divs 100px, remove when images loads.
// const onScrollHandler = function () {
//   const scrollTop =
//     document.documentElement.scrollTop || document.body.scrollTop;
//   if (scrollTop > 100 && scrollTop < 120) {
//     console.log("100 - 120");
//   }
//   if (scrollTop > 200 && scrollTop < 220) {
//     console.log("200 - 220", item, index);
//   }
//   if (scrollTop > 300 && scrollTop < 320) {
//     console.log("300 - 320");
//   }
// };

// Test Container for adding images dynamically
const DynImgContainer = document.getElementsByClassName(
  "images-dynamically"
)[0];
function addImgElement(imgSrc) {
  // remove "public" from url-path string
  let newString = imgSrc.replace("public", "");
  // console.log(newString);
  // create img, add style, set img src, append to imgcontainer
  const imgElement = document.createElement("img");
  imgElement.classList.add("dynamic-images-active");
  imgElement.src = newString;
  imgElement.setAttribute("data-src", imgSrc);
  DynImgContainer.append(imgElement);
}

// GET request to Express server, to get images
// const dynamicImages = async () => {
//   const response = await fetch("http://localhost:8000/dynamicImages");

//   try {
//     const data = await response.json();

//     console.log(data);

//     for (let i = 0; i < data.length; i++) {
//       // const WeWillRockYou = data[i].slice(0, 5);

//       const onScrollHandler = function () {
//         const scrollTop =
//           document.documentElement.scrollTop || document.body.scrollTop;
//         if (scrollTop > 100 && scrollTop < 120) {
//           console.log("100 - 120");
//         }
//         if (scrollTop > 200 && scrollTop < 202) {
//           // WeWillRockYou.forEach((img) => addImgElement(img));
//         }
//         if (scrollTop > 300 && scrollTop < 320) {
//           console.log("300 - 320");
//         }
//       };
//       window.addEventListener("scroll", onScrollHandler);
//     }
//   } catch (err) {
//     console.log("ERROR dynamicImages", err);
//   }
// };

function convertToLinkString(title) {
  return title.toLowerCase().replace(/\s/g, "-");
}

function buildNavigationElement(showObjects, isAll = false) {
  const dropdown = document.querySelector(".dropdown");
  const dropdownWrapper = document.createElement("div");
  dropdownWrapper.classList.add("dropdown-wrapper");

  // navigation title
  const headerHover = document.createElement("span");
  headerHover.classList.add("header-hover");
  headerHover.textContent = isAll ? "Alle Shows" : showObjects[0].year;
  dropdownWrapper.append(headerHover);
  const dropdownContent = document.createElement("div");
  dropdownContent.classList.add("dropdown-content");
  if (isAll) dropdownContent.classList.add("all");

  // subelements
  showObjects.forEach((showObj) => {
    const link = document.createElement("a");
    link.href = "#" + convertToLinkString(showObj.title);
    link.textContent = showObj.title;
    dropdownContent.append(link);
  });

  dropdownWrapper.append(dropdownContent);
  dropdown.append(dropdownWrapper);
}

async function dynamicImages() {
  const response = await fetch("/.netlify/functions/server/dynamicImages");
  const data = await response.json();

  const lazyloadWrapper = document.querySelector(".lazyload-wrapper");

  // const years = data.filter((showObject, index) => {
  //   data.indexOf(showObject) === index;
  // });

  // const years = data
  //   .filter(
  //     (showObj, index) =>
  //       data.findIndex((so) => so.year === showObj.year) === index
  //   )
  //   .map((so) => so.year);

  const years = data
    .map((so) => so.year)
    .filter((year, index, array) => array.indexOf(year) === index);

  buildNavigationElement(data, true);

  years.forEach((year) => {
    const lazyImagesWrapper = document.createElement("div");
    lazyImagesWrapper.classList.add("lazy-images-wrapper");

    // Year
    const yearsShow = document.createElement("div");
    yearsShow.textContent = year;
    yearsShow.classList.add("year-shows");
    lazyImagesWrapper.append(yearsShow);

    // nav element
    buildNavigationElement(data.filter((so) => so.year === year));

    data
      .filter((so) => so.year === year)
      .forEach((showObj) => {
        // Title
        const title = document.createElement("p");
        title.classList.add("show-alone");
        title.id = convertToLinkString(showObj.title);
        title.textContent = showObj.title;
        lazyImagesWrapper.append(title);
        const imagesWrapper = document.createElement("div");
        imagesWrapper.classList.add("images-wrapper");
        // Images
        const lazyImages = document.createElement("div");
        lazyImages.classList.add("lazy-images");
        showObj.imgArray.forEach((imageUrl) => {
          const imageElement = document.createElement("img");
          imageElement.classList.add("lazy");
          imageElement.setAttribute("data-src", imageUrl);

          lazyImages.append(imageElement);
        });
        imagesWrapper.append(lazyImages);

        lazyImagesWrapper.append(imagesWrapper);
        lazyloadWrapper.append(lazyImagesWrapper);
      });
  });

  // data.forEach((showObj) => {

  //   // Title
  //   const title = document.createElement("p");
  //   title.classList.add("show-alone");
  //   title.textContent = showObj.title;
  //   lazyImagesWrapper.append(title);
  //   const imagesWrapper = document.createElement("div");
  //   imagesWrapper.classList.add("images-wrapper");
  //   // Images
  //   const lazyImages = document.createElement("div");
  //   lazyImages.classList.add("lazy-images");
  //   showObj.imgArray.forEach((imageUrl) => {
  //     const imageElement = document.createElement("img");
  //     imageElement.classList.add("lazy");
  //     imageElement.setAttribute("data-src", imageUrl);
  //     lazyImages.append(imageElement);
  //   });
  //   imagesWrapper.append(lazyImages);

  //   lazyImagesWrapper.append(imagesWrapper);
  //   lazyloadWrapper.append(lazyImagesWrapper);
  // });
  lazyLoadActivate();
  buildLightBox();
  addClickEventToNavigation();
}

dynamicImages();
//website - www. css-tricks.com/the-complete-guide-to-lazy-loading-images/

function lazyLoadActivate() {
  let lazyloadThrottleTimeout;
  // console.log(lazyloadImages);

  function lazyload() {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }

    lazyloadThrottleTimeout = setTimeout(function () {
      const lazyloadImages = document.querySelectorAll("img.lazy");
      // console.log("we get here", lazyloadImages);
      const scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function (img) {
        if (img.offsetTop < window.innerHeight + scrollTop) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");
        }
      });
      if (lazyloadImages.length == 0) {
        document.removeEventListener("scroll", lazyload);
        window.removeEventListener("resize", lazyload);
        window.removeEventListener("orientationChange", lazyload);
      }
    }, 20);
  }

  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
}

// Navbar for the image gallery
// const rightArrow = document.getElementsByClassName("arrow-right")[0];
// const lazyNav = document.querySelector(".lazy-nav");
// const arrowMenu = document.getElementsByClassName("arrow-menu")[0];

// arrowMenu.addEventListener("click", function () {
//   console.log(arrowMenu);
//   lazyNav.classList.toggle("lazy-nav-active");
//   rightArrow.classList.toggle("arrow-right-active");
//   const openClose = document.getElementsByClassName("open-close")[0];
//   if (openClose.innerHTML === "Open") {
//     openClose.innerHTML = "Close";
//   } else if ((openClose.innerHTML = "Close")) {
//     openClose.innerHTML = "Open";
//   }
//   console.log(openClose);
// });

function addClickEventToNavigation() {
  const lazyNavWrapper = document.getElementsByClassName("dropdown-wrapper");
  const lazyNavContent = document.getElementsByClassName("dropdown-content");
  const lazyNavHeader = document.getElementsByClassName("header-hover");
  const lazyNavHeaderID = document.getElementById("header-hover-wide");

  // Click on the year to activate a dropdownlist. Click on a link or somewhere else to close the dropdownlist
  for (let i = 0; i < lazyNavHeader.length; i++) {
    // console.log(lazyNavHeader[i]);
    lazyNavHeader[i].addEventListener("click", () => {
      lazyNavContent[i].classList.toggle("dropdown-content-active");
      lazyNavHeader[i].classList.toggle("header-hover-active");

      // REMOVE then yearlink toggles propperly
      const dropdown_a = lazyNavContent[i].getElementsByTagName("a");
      for (let y = 0; y < dropdown_a.length; y++) {
        dropdown_a[y].classList.toggle("a-links-active");

        if (lazyNavContent[i].classList.contains("dropdown-content-active")) {
          document.body.addEventListener(
            "click",
            () => {
              lazyNavContent[i].classList.remove("dropdown-content-active");
              lazyNavHeader[i].classList.remove("header-hover-active");
              dropdown_a[y].classList.remove("a-links-active");
            },
            true
          );
        }
      }
      //REMOVE
    });
  }
}
