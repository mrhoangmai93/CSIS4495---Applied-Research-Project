const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  foods: [
    {
      foodId: {
        type: Schema.Types.ObjectId,
        ref: "food"
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  subTotal: {
    type: Number,
    require: true
  }
});

module.exports = Cart = mongoose.model("cart", CartSchema);
