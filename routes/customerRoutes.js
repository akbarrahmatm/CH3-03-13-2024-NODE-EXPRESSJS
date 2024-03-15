const express = require("express");

const router = express.Router();

const customerController = require("../controllers/customerController");

router
  .route("/")
  .get(customerController.getAllCustomer)
  .post(customerController.insertCustomer);

router
  .route("/:id")
  .get(customerController.getCustomerById)
  .patch(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

module.exports = router;
