const fs = require("fs");

const Customer = require("../models/customerModel");

const getAllCustomer = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({
      status: "Success",
      totalData: customers.length,
      requestAt: req.requestTime,
      data: { customers },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const customers = await Customer.findById(id);

    res.status(200).json({
      status: "Success",
      data: { customers },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const id = req.params.id;

    const customer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: "Success",
      message: "Data successfully updated",
      data: {
        customer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Customer.findByIdAndDelete(id);

    return res.status(204).json({
      status: "Success",
      message: "Data successfully deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

const insertCustomer = async (req, res, next) => {
  try {
    const newCustomer = await Customer.create(req.body);

    res.status(201).json({
      status: "Success",
      data: {
        customer: newCustomer,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  getAllCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  insertCustomer,
};
