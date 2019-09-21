const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  orderDetail: {
    items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "food"
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    orderTotal: {
      type: Number,
      required: true
    }
  },
  shippingAddress: {
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
    },
    phone: {
      type: String,
      required: true
    }
  },

  paymentMethod: {
    cardNumber: {
      type: String,
      required: true
    },
    nameOnCard: {
      type: String,
      required: true
    },

    expireDate: {
      type: String,
      required: true
    },
    securityNumber: {
      type: String,
      required: true
    }
  },
  orderStatus: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model("order", OrderSchema);
