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

  payment: [
    {
      cardnumber: {
        type: String,
        required: true
      },
      nameoncard: {
        type: String,
        required: true
      },

      expiredate: {
        type: String,
        required: true
      },
      security: {
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
