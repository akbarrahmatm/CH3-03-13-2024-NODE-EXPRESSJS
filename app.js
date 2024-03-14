const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware for read json from req.body
app.use(express.json());

const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/dummy.json`));

const defaultRouter = (req, res, next) => {
  res.send("<h1>Hola</h1>");
};

const getAllCustomer = (req, res, next) => {
  res.status(200).json({
    status: "Success",
    totalData: customers.length,
    data: { customers },
  });
};

const getCustomerById = (req, res, next) => {
  const customer = customers.find((custData) => custData._id === req.params.id);

  res.status(200).json({
    status: "Success",
    data: { customer },
  });
};

const updateCustomer = (req, res, next) => {
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
      });
    }
  );
};

const deleteCustomer = (req, res, next) => {
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

  // Kalau ada, delete data
  customers.splice(customerIndex, 1);

  // Update data
  fs.writeFile(
    `${__dirname}/data/dummy.json`,
    JSON.stringify(customers),
    (err) => {
      return res.status(200).json({
        status: "Success",
        message: "Data successfully deleted",
      });
    }
  );
};

const insertCustomer = (req, res, next) => {
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
};

// Router
app.get("/", defaultRouter);
app.get("/api/v1/customers", getAllCustomer);
app.get("/api/v1/customers/:id", getCustomerById);
app.patch("/api/v1/customers/:id", updateCustomer);
app.patch("/api/v1/customers/delete/:id", deleteCustomer);
app.post("/api/v1/customers", insertCustomer);

app.listen(PORT, () => {
  console.log(`App running on: locahost:${PORT}`);
});
