const fs = require("fs");

const imagesEndpoint = [];
const src = "public/images/gallery";

const years = fs.readdirSync(src).filter((d) => d !== ".DS_Store");
years.forEach((year) => {
  let shows = fs.readdirSync(src + "/" + year).filter((d) => d !== ".DS_Store");
  shows.forEach((show) => {
    let images = fs
      .readdirSync(src + "/" + year + "/" + show)
      .filter((d) => d !== ".DS_Store");

    const showObj = {
      year: year,
      title: show.replace(/_/g, " ").slice(1),
      imgArray: images.map((image) => {
        return "/images/gallery/" + year + "/" + show + "/" + image;
      }),
    };
    imagesEndpoint.push(showObj);

    // console.log("imgArray", showObj.title);
  });
});

let data = JSON.stringify(imagesEndpoint);
fs.writeFileSync("functions/data.json", data);
