require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

// Data to populate database. Ensure it is in JSON format.
const mockData = require("./MOCK_DATA.json");

// Development DB Connection
const db = process.env.DEV_DB;

// Connect to MongoDB instance
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.log("MongoDB connection error: " + err));

// Mock data if the document collection is empty, otherwise exit.
const dbConn = mongoose.connection;

dbConn.once("open", async () => {
  if ((await Product.countDocuments().exec()) > 0) {
    console.log("Document collection is populated, no data added. Exiting.");
    process.exit();
  }

  let promises = [];

  mockData.forEach((prods) => {
    promises.push(Product.create(prods));
  });

  Promise.all(promises).then(() => {
    console.log("Added initial data successfully. Exiting.");
    process.exit();
  });
});
