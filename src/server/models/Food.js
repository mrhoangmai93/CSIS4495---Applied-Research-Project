const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create Schema
const FoodSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  images: {
    type: [String],
    require: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  tags: {
    type: [String]
  },
  active: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  pickingUpAddress: {
    address1: {
      type: String,
      required: true
    },
    address2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    }
  }
});

module.exports = Food = mongoose.model("food", FoodSchema);
