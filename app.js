const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 3000;

const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/dummy.json`));

app.get("/", (req, res, next) => {
  res.send("<h1>Hola</h1>");
});

app.get("/api/v1/customers", (req, res, next) => {
  res.status(200).json({
    status: "Success",
    totalData: customers.length,
    data: { customers },
  });
});

app.listen(PORT, () => {
  console.log(`App running on: locahost:${PORT}`);
});
