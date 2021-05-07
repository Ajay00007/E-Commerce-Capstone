require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

// DB Connection
const db = process.env.MONGODB_URI || process.env.DEV_DB;

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
