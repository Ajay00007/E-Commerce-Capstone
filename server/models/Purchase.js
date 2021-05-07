const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  Date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
