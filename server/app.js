const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/products", require("./routes/products"));
app.use("/api/users", require("./routes/users"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/auth", require("./routes/auth"));

module.exports = app;
