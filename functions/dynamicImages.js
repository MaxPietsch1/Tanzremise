"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

// Local server
// const port = 8000;
// app.listen(port, () => {
//   console.log(`Running on localhost: ${port}`);
// });
// app.use(express.static("public"));

// Setup server for Netlify
const router = express.Router();
// router.get("/", (req, res) => {
//   res.writeHead(200, { "Content-Type:": "text/html" });
//   res.write("<h1>Hello from Express server</h1>");
//   res.end();
// });
router.get("/", (req, res) => res.send(imagesEndpoint));
// router.post("/", (req, res) => res.json({ postBody: req.body }));

// BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/.netlify/functions/dynamicImages", router);
// app.use("/", (req, res) =>
//   res.sendFile(path.join(__dirname, "../public/index.html"))
// );

// Dynamic Image Endpoint
const imagesEndpoint = [];

// GET image names from imagesEndpoint
// app.get("/dynamicImages", (req, res) => {
//   res.send(imagesEndpoint);
// });

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
  // console.log(imagesEndpoint);
}

buildImagesEndpoint();

module.exports = app;
module.exports.handler = serverless(app);
