const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware for read json from req.body
app.use(express.json());

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

app.post("/api/v1/customers", (req, res, next) => {
  console.log(req.body);

  const newCust = req.body;

  customers.push(newCust);
  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customers),
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          customer: newCust,
        },
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`App running on: locahost:${PORT}`);
});
