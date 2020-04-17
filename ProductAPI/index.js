const express = require("express");
const bodyparser = require("body-parser").json;
const app = express();
const PORT = 3005;
const router = require("./router");
const cors = require("cors");

app.use(cors());

app.use(bodyparser());

app.use("/", router);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
