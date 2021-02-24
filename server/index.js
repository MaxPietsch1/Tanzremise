const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

// BODY-PARSER
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Local server
const port = 8000;
app.listen(port, () => {
  console.log(`Running on localhost: ${port}`);
});
app.use(express.static("public"));

// Dynamic Image Endpoint
const imagesEndpoint = [];

// GET image names from imagesEndpoint
app.get("/dynamicImages", (req, res) => {
  res.send(imagesEndpoint);
});

function buildImagesEndpoint() {
  const src = "public/images/gallery";

  const years = fs.readdirSync(src).filter((d) => d !== ".DS_Store");
  years.forEach((year) => {
    let shows = fs.readdirSync(src + "/" + year);
    shows.forEach((show) => {
      let images = fs.readdirSync(src + "/" + year + "/" + show);

      const showObj = {
        year: year,
        title: show.replace(/_/g, " ").slice(1, 22),
        imgArray: images.map((image) => {
          return "/images/gallery/" + year + "/" + show + "/" + image;
        }),
      };
      imagesEndpoint.push(showObj);
    });
  });
  console.log(imagesEndpoint);
}

buildImagesEndpoint();
// console.log(imagesEndpoint);

// // glob, access folders
// const getDirectories = function (src, callback) {
//   glob(src + "/*", callback);
// };
// getDirectories("public/images", function (err, res) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     // console.log(res[0]);
//     const showObj = {
//       title: res[0].replace("public/images/", "").replace("_", " "),
//       imgArray: [],
//     };
//     glob(res[0] + "/*", function (err, res) {
//       // console.log(res);
//       showObj.imgArray = res;
//     });
//     // console.log(showObj);
//     imagesEndpoint.push(showObj);
//     console.log("imagesEndpoint", imagesEndpoint);
//   }
// });
