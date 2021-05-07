const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: { type: String, required: true },
  manufacturer: { type: String, required: true },
  rating: { type: Number, default: 0 },
  price: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
  stockQty: { type: Number, default: 0 },
  upc: { type: String, required: true },
  productImage: { type: String },
  tags: [{ type: String }],
});

module.exports = mongoose.model("Product", productSchema);
