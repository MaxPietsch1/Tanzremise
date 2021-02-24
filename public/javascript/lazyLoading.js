// //website - www. css-tricks.com/the-complete-guide-to-lazy-loading-images/

// document.addEventListener("DOMContentLoaded", function () {
//   const lazyloadImages = document.querySelectorAll("img.lazy");
//   let lazyloadThrottleTimeout;
//   // console.log(lazyloadImages);

//   function lazyload() {
//     if (lazyloadThrottleTimeout) {
//       clearTimeout(lazyloadThrottleTimeout);
//     }

//     lazyloadThrottleTimeout = setTimeout(function () {
//       console.log("we get here", lazyloadImages);
//       const scrollTop = window.pageYOffset;
//       lazyloadImages.forEach(function (img) {
//         if (img.offsetTop < window.innerHeight + scrollTop) {
//           img.src = img.dataset.src;
//           img.classList.remove("lazy");
//         }
//       });
//       if (lazyloadImages.length == 0) {
//         document.removeEventListener("scroll", lazyload);
//         window.removeEventListener("resize", lazyload);
//         window.removeEventListener("orientationChange", lazyload);
//       }
//     }, 20);
//   }

//   document.addEventListener("scroll", lazyload);
//   window.addEventListener("resize", lazyload);
//   window.addEventListener("orientationChange", lazyload);
// });
