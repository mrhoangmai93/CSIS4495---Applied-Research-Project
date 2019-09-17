const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

// Load Info Model
const UserInfo = require("../../models/UserInfo");
// Load user Model
const User = require("../../models/User");

// @route   GET api/userinfo
// @desc    Get current users profile
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const userInfo = await UserInfo.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!userInfo) {
      return res
        .status(404)
        .json({ msg: "There is no information for this user" });
    }
    res.json(userInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route   POST api/userinfo
// @desc    CREATE or UPDATE user information
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("address1", "Address is required")
        .not()
        .isEmpty(),
      check("city", "City is required")
        .not()
        .isEmpty(),
      check("state", "State is required")
        .not()
        .isEmpty(),
      check("zipCode", "Zip Code is required")
        .not()
        .isEmpty(),
      check("phone", "Phone is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { address1, address2, city, zipCode, state, phone } = req.body;

    //build userInfo object
    const userInf = {};
    userInf.address = {};

    userInf.user = req.user.id;

    userInf.address.address1 = address1;
    if (address2) userInf.address.address2 = address2;
    userInf.address.city = city;
    userInf.address.zipCode = zipCode;
    userInf.address.state = state;
    userInf.address.phone = phone;

    try {
      let userinfo = await UserInfo.findOne({ user: req.user.id });

      if (userinfo) {
        // update
        userinfo = await UserInfo.findOneAndUpdate(
          { user: req.user.id },
          { $set: userInf },
          { new: true }
        );
        return res.json(userinfo);
      }
      userinfo = new UserInfo(userInf);

      await userinfo.save();
      res.json(userinfo);
    } catch (err) {
      console.log(err.message);

      res.status(500).send("Server Error!");
    }
  }
);
// @route   PUT api/userinfo/payment
// @desc    Add payment method to profile
// @access  Private
router.put(
  "/payment",
  [
    auth,
    [
      check("cardnumber", "Card Number is required")
        .not()
        .isEmpty(),
      check("nameoncard", "Name on card is required")
        .not()
        .isEmpty(),
      check("expiredate", "Expire date is required")
        .not()
        .isEmpty(),
      check("security", "Sercurity code is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check Validation
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cardnumber, nameoncard, expiredate, security } = req.body;
    //build userInfo object
    const newPayment = {
      cardnumber,
      nameoncard,
      expiredate,
      security
    };
    userInf.address = {};

    userInf.user = req.user.id;

    userInf.address.address1 = address1;
    if (address2) userInf.address.address2 = address2;
    userInf.address.city = city;
    userInf.address.zipCode = zipCode;
    userInf.address.state = state;
    userInf.address.phone = phone;

    try {
      let userinfo = await UserInfo.findOne({ user: req.user.id });

      if (userinfo) {
        // update
        userinfo = await UserInfo.findOneAndUpdate(
          { user: req.user.id },
          { $set: userInf },
          { new: true }
        );
        return res.json(userinfo);
      }
      userinfo = new UserInfo(userInf);

      await userinfo.save();
      res.json(userinfo);
    } catch (err) {
      console.log(err.message);

      res.status(500).send("Server Error!");
    }
    UserProfile.findOne({ user: req.user.id }).then(uInfo => {
      if (req.body._id) {
        const updateIndex = uInfo.payment
          .map(item => item._id.toString())
          .indexOf(req.body._id);
        if (updateIndex >= 0) {
          const newPayment = {
            _id: req.body._id,
            cardnumber: req.body.cardnumber,
            nameoncard: req.body.nameoncard,
            expiredate: req.body.expiredate,
            security: req.body.security
          };
          uInfo.payment[updateIndex] = newPayment;
          uInfo.save().then(uInfo => res.json(uInfo));
        }
      } else {
        const newPayment = {
          cardnumber: req.body.cardnumber,
          nameoncard: req.body.nameoncard,
          expiredate: req.body.expiredate,
          security: req.body.security
        };
        if (!isEmpty(uInfo.payment)) {
          // Add to exp array
          uInfo.payment.unshift(newPayment);
        } else {
          uInfo.payment = [];
          uInfo.payment.push(newPayment);
        }
        uInfo.save().then(uInfo => res.json(uInfo));
      }
    });
  }
);
module.exports = router;
