const express = require("express");
const path = require("path");

var app = express();

app.use(express.static(path.resolve(__dirname, "public")));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening at ${prorcess.env.PORT || 3000}`);
});