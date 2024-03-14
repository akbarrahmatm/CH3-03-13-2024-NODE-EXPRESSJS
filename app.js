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

// Get data
app.get("/api/v1/customers", (req, res, next) => {
  res.status(200).json({
    status: "Success",
    totalData: customers.length,
    data: { customers },
  });
});

// Get data by id
app.get("/api/v1/customers/:id", (req, res, next) => {
  const customer = customers.find((custData) => custData._id === req.params.id);

  res.status(200).json({
    status: "Success",
    data: { customer },
  });
});

// Update data
app.patch("/api/v1/customers/:id", (req, res, next) => {
  const id = req.params.id;

  // Search ID
  const customer = customers.find((custData) => custData._id === id);
  const customerIndex = customers.findIndex((custData) => custData._id === id);

  // If data didn't exist
  if (!customer) {
    return res.status(404).json({
      status: "Failed",
      message: `Customer with ID '${id}' Not Found`,
    });
  }

  // Kalau ada, update data dari req.body from client
  customers[customerIndex] = { ...customers[customerIndex], ...req.body };

  // Update data
  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customers),
    (err) => {
      return res.status(200).json({
        status: "Success",
        message: "Data successfully updated",
        // data: {
        //   customer: customers[customerIndex],
        // },
      });
    }
  );
});

// Create data
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
