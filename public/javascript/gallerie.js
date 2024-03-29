function buildLightBox() {
  const images = document.getElementsByClassName("lazy-images");
  const imgBackground = document.createElement("div");
  const xBtn = document.createElement("button");
  xBtn.innerHTML = "X";

  for (let i = 0; i < images.length; i++) {
    const children = images[i].children;

    for (let i = 0; i < children.length; i++) {
      children[i].addEventListener("click", function myFunction() {
        xBtn.classList.add("close-image");

        xBtn.addEventListener("click", () => {
          this.classList.remove("lazy-image-active");
          xBtn.classList.remove("close-image");
          imgBackground.classList.remove("lazyload-wrapper-active");
          xBtn.remove();
          if (document.body.style.position == "fixed") {
            const scrollY = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            window.scrollTo(0, parseInt(scrollY || "0") * -1);
          }
        });

        if (imgBackground.classList.contains("lazyload-wrapper-active")) {
          xBtn.remove();
          const scrollY = document.body.style.top;
          document.body.style.position = "";
          document.body.style.top = "";
          window.scrollTo(0, parseInt(scrollY || "0") * -1);
        } else {
          imgBackground.appendChild(xBtn);
          document.body.style.top = `-${window.scrollY}px`;
          document.body.style.position = "fixed";
        }

        this.classList.toggle("lazy-image-active");
        imgBackground.classList.toggle("lazyload-wrapper-active");
        document.body.append(imgBackground);
      });
    }
  }
}

// Stickynavbar on photogallery
function openStickyNav() {
  const stickyNav = document.getElementsByClassName("sticky-allshows")[0];
  const stickyUl = document.getElementsByClassName("sticky-ul-hide")[0];
  const stickyArrow = document.getElementsByClassName("sticky-arrow")[0];

  stickyNav.addEventListener("click", () => {
    stickyUl.classList.toggle("sticky-ul-active");
    stickyArrow.classList.toggle("sticky-arrow-active");
  });
}
openStickyNav();

// Test Container for adding images dynamically
const DynImgContainer =
  document.getElementsByClassName("images-dynamically")[0];
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

// console.log("test");
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
  const response = await fetch("/.netlify/functions/dynamicImages");
  const data = await response.json();

  const lazyloadWrapper = document.querySelector(".lazyload-wrapper");

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

        // Images
        const lazyImages = document.createElement("div");
        lazyImages.classList.add("lazy-images");

        // Images overlay
        // const overlayImages = document.createElement("span");
        // overlayImages.classList.add("overlay-images");
        // overlayImages.innerHTML = "test";

        // Adds all images on webpages, lazyload on scroll
        showObj.imgArray.forEach((imageUrl) => {
          const imageElement = document.createElement("img");
          imageElement.classList.add("lazy");
          imageElement.setAttribute("data-src", imageUrl);
          lazyImages.appendChild(imageElement);
          // console.log(overlayImages);
        });

        lazyImagesWrapper.append(lazyImages);
        lazyloadWrapper.append(lazyImagesWrapper);

        for (var key in lazyImages) {
          if (lazyImages.hasOwnProperty(key)) {
            console.log(key + " -> " + lazyImages[key]);
          }
        }

        // console.log(lazyImages);
      });
  });

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
      const scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function (img) {
        // when images is in viewport, then the images will get loaded inside the view
        if (
          img.offsetTop < window.innerHeight + scrollTop &&
          img.offsetTop > scrollTop
        ) {
          img.src = img.dataset.src;
          img.classList.remove("lazy");

          img.addEventListener("click", function () {
            if (this.dataset.src.includes("gallery")) {
              let withThumbnail = this.dataset.src.replace(
                "thumbnailgallery",
                "gallery"
              );
              this.dataset.src = withThumbnail;
              img.src = img.dataset.src;

              const imgLoader = document.createElement("div");
              const backgroundActive = document.getElementsByClassName(
                "lazyload-wrapper-active"
              );

              imgLoader.classList.add("img-loader");
              document.body.append(imgLoader);

              function loaded() {
                imgLoader.remove();
              }

              img.addEventListener("click", () => {
                imgLoader.remove();
              });
              if (!backgroundActive.length > 0) {
                imgLoader.remove();
              } else {
                const closeImg = backgroundActive[0].children[0];
                closeImg.addEventListener("click", () => {
                  imgLoader.remove();
                });
              }

              // when image is done loading -> remove loadbar
              if (img.complete) {
                loaded();
              } else {
                img.addEventListener("load", loaded);
                img.addEventListener("error", function () {
                  alert("error loading the image");
                });
              }
              // https://stackoverflow.com/questions/280049/how-to-create-a-javascript-callback-for-knowing-when-an-image-is-loaded
            }
          });
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

function addClickEventToNavigation() {
  const lazyNavWrapper = document.getElementsByClassName("dropdown-wrapper");
  const lazyNavContent = document.getElementsByClassName("dropdown-content");
  const lazyNavHeader = document.getElementsByClassName("header-hover");
  // const dropdownTest = document.getElementsByClassName("dropdown-wrapper");
  // const lazyNavHeaderID = document.getElementById("header-hover-wide");

  // Click on the year to activate a dropdownlist. Click on a link or somewhere else to close the dropdownlist
  for (let i = 0; i < lazyNavHeader.length; i++) {
    // console.log(lazyNavHeader[i]);
    // lazyNavHeader[i].addEventListener("click", () => {
    lazyNavWrapper[i].addEventListener("click", () => {
      lazyNavContent[i].classList.toggle("dropdown-content-active");
      lazyNavHeader[i].classList.toggle("header-hover-active");
      // dropdownTest[i].classList.toggle("header-hover-active");
      lazyNavWrapper[i].classList.toggle("dropdown-wrapper-active");

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
              lazyNavWrapper[i].classList.remove("dropdown-wrapper-active");
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
