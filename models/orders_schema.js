const mongoose = require("mongoose");
const OrdersSchema = mongoose.Schema({
  user_id: {
    type: String,
  },
  address_id: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
  },
  status: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model("orders", OrdersSchema);