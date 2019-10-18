const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SellerProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  userName: {
    type: String,
    required: true,
    max: 40
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },

  socials: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  feedbacks: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  ratings: [
    {
      point: {
        type: Number,
        require: true
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    }
  ]
});

module.exports = SellerProfile = mongoose.model(
  "sellerProfile",
  SellerProfileSchema
);
