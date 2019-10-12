const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UsersInfoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  address: {
    address1: {
      type: String
    },
    address2: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipCode: {
      type: String
    }
  },
  phone: {
    type: String
  },
  // shippingaddress: {
  //   add1: {
  //     type: String,
  //     required: true
  //   },
  //   add2: {
  //     type: String
  //   },
  //   city: {
  //     type: String,
  //     required: true
  //   },
  //   state: {
  //     type: String,
  //     required: true
  //   },
  //   zipcode: {
  //     type: String,
  //     required: true
  //   }
  // },
  // billingaddress: {
  //   add1: {
  //     type: String,
  //     required: true
  //   },
  //   add2: {
  //     type: String
  //   },
  //   city: {
  //     type: String,
  //     required: true
  //   },
  //   state: {
  //     type: String,
  //     required: true
  //   },
  //   zipcode: {
  //     type: String,
  //     required: true
  //   }
  // },

  payments: [
    {
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
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = UsersInfo = mongoose.model("userinfo", UsersInfoSchema);
