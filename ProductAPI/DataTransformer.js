const csv = require("csv-parser");
const fs = require("fs");
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;

let readStream = fs.createReadStream("./data/product.csv");
let writeStream = fs.createWriteStream("./data/newtest.csv");

const csvStringifier = createCsvStringifier({
  header: [
    { id: "id", title: "id" },
    { id: "name", title: "name" },
    { id: "slogan", title: "slogan" },
    { id: "description", title: "description" },
    { id: "category", title: "category" },
    { id: "default_price", title: "default_price" },
  ],
});

writeStream.write(csvStringifier.getHeaderString());

readStream.pipe(csv()).on("data", (data) => {
  for (let key in data) {
    //trims whitespace
    let trimKey = key.trim();
    data[trimKey] = data[key];
    if (key !== trimKey) {
      delete data[key];
    }
  }

  let onlyNumbers = data.default_price.replace(/\D/g, "");
  data.default_price = onlyNumbers;
  writeStream.write(csvStringifier.stringifyRecords([data]));
});

// .on("end", () => {
//   console.log("finished reading");
//   csvWriter
//     .writeRecords(results) // returns a promise
//     .then(() => {
//       console.log("...Done");
//     });
// });

// This will produce a file path/to/file.csv with following contents:
//
//   NAME,LANGUAGE
//   Bob,"French, English"
//   Mary,English

// const csvWriter = createCsvWriter({
//   path: "./data/newphotos.csv",
//   header: [
//     { id: "0", title: "id" },
//     { id: "1", title: "style_id" },
//     { id: "2", title: "url" },
//     { id: "3", title: "thumbnail_url" },
//   ],
// });
