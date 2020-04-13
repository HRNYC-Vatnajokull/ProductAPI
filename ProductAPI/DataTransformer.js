const fs = require("fs");
const csv = require("csv-parser");
const CSVCleaner = require("./tranformattempttwo");
const transformer = new CSVCleaner({ writableObjectMode: true });

let readStream = fs.createReadStream("./data/product.csv");
let writeStream = fs.createWriteStream("./data/newtest.csv");

const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
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

readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on("finish", () => {
    console.log("finished");
  });
// .on("data", (data) => {
//   writeStream.write(data);
// });
