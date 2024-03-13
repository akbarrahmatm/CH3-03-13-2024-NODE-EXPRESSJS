const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res, next) => {
  res.send("<h1>Hola</h1>");
});

app.get("/data", (req, res, next) => {
  res.send("<h1>Hola</h1>");
});

app.listen(PORT, () => {
  console.log(`App running on: locahost:${PORT}`);
});
