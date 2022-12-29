const mongoose = require("mongoose");
const CartSchema = mongoose.Schema({
  user_id: {
    type: String,
  },
  product_id: {
    type: String,
  },
  quantity: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("cart", CartSchema);
