require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");

const PORT = process.env.PORT;

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log("Koneksi berhasil");
  });

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  city: String,
  country: {
    type: String,
    required: true,
    default: "Indonesia",
  },
});

const Customer = mongoose.model("Customer", customerSchema);

const customerTest = new Customer({
  name: "Akbar Ganteng",
  email: "akbarganteng@gmail.com",
  phoneNumber: "082637627632",
});

customerTest
  .save()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(`ERROR: ${err}`);
  });
app.listen(PORT, () => {
  console.log(`App running on: locahost:${PORT}`);
});
