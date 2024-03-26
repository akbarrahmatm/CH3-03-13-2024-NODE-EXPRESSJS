const fs = require("fs");

const Customer = require("../models/customerModel");

const getAllCustomer = async (req, res, next) => {
  try {
    // Basic Filtering
    const queryObject = { ...req.query };
    const excludedColumn = ["page", "sort", "limit", "fields"];
    excludedColumn.forEach((el) => delete queryObject[el]);

    // Advanced Filtering
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryStr = JSON.parse(queryStr);

    console.log(queryStr);

    let query = Customer.find(queryStr);

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Field Limitting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      console.log(fields);
      query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 2;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numCustomers = await Customer.countDocuments();
      if (skip > numCustomers) throw new Error("Page does not exist!");
    }

    // Execution Query
    const customers = await query;

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
