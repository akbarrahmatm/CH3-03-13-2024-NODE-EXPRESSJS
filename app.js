const express = require("express");
const morgan = require("morgan");

const app = express();

const customerRouter = require("./routes/customerRoutes");

// Middleware for read json from req.body
app.use(express.json());

app.use(morgan("dev"));

// Our own middleware
app.use((req, res, next) => {
  console.log("Testingggggg");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const defaultRouter = (req, res, next) => {
  res.send("<h1>Hola</h1>");
};

// Router

app.use("/api/v1/customers", customerRouter);

app.get("/", defaultRouter);

module.exports = app;
