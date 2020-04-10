const csv = require("csv-parser");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

let readStream = fs.createReadStream("./data/product.csv");
let writeStream = fs.createWriteStream("./data/newtest.csv");

readStream.pipe(csv()).on("data", (data) => {
  for (let key in data) {
    let trimKey = key.trim();
    let onlyNumbers = data[key].replace(/\D/g, "");
    data[trimKey] = onlyNumbers;
    delete data[key];
  }
  console.log(data);
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
