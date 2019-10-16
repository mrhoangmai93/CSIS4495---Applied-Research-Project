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
// @desc    CREATE user information
// @access  Private
router.post("/", [auth], async (req, res) => {
  try {
    let userinfo = await UserInfo.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (userinfo) {
      return res.json(userinfo);
    }
    //build userInfo object
    const userInf = {};

    userInf.user = req.user.id;
    userInf.address = {};
    userInf.payments = [];
    userinfo = new UserInfo(userInf);

    await userinfo.save();
    res.json(userinfo);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
});
// @route   POST api/userinfo/address
// @desc    CREATE or UPDATE user information
// @access  Private
router.post(
  "/address",
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
    let address = {};

    userInf.user = req.user.id;
    userInf.phone = phone;
    address.address1 = address1;
    if (address2) address.address2 = address2;
    address.city = city;
    address.zipCode = zipCode;
    address.state = state;

    userInf.address = address;

    try {
      let userinfo = await UserInfo.findOne({ user: req.user.id }).populate(
        "user",
        ["name", "avatar"]
      );

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
// @desc    Add/update payment method
// @access  Private
router.put(
  "/payment",
  [
    auth,
    [
      check("cardNumber", "Card Number is required")
        .not()
        .isEmpty(),
      check("nameOnCard", "Name on card is required")
        .not()
        .isEmpty(),
      check("expireDate", "Expire date is required")
        .not()
        .isEmpty(),
      check("securityNumber", "Sercurity Number code is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // Check Validation
    if (!errors.isEmpty()) {
      console.log(errors);

      return res.status(400).json({ errors: errors.array() });
    }

    const {
      _id,
      cardNumber,
      nameOnCard,
      expireDate,
      securityNumber
    } = req.body;
    //build userInfo object
    const newPayment = {
      cardNumber,
      nameOnCard,
      expireDate,
      securityNumber
    };
    try {
      let userinfo = await UserInfo.findOne({ user: req.user.id }).populate(
        "user",
        ["name", "avatar"]
      );

      if (userinfo) {
        //check if there is payment
        if (userinfo.payments) {
          //check if there is payment id passing in the body
          // yes => update the existing payment
          if (_id) {
            const updateIndex = userinfo.payments
              .map(pm => pm._id.toString())
              .indexOf(_id);
            if (updateIndex >= 0) {
              userinfo.payments[updateIndex] = newPayment;
            }
          } else {
            //add a new payment to array
            userinfo.payments.unshift(newPayment);
          }
        } else {
          //no previous payment added
          userinfo.payments = [];
          userinfo.payments.push(newPayment);
        }
      } else {
        return res.status(400).json({ msg: "No information for this user" });
      }

      await userinfo.save();

      res.json(userinfo);
    } catch (err) {
      console.log(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Payment not found" });
      }
      res.status(500).send("Server Error!");
    }
  }
);
// @route   PUT api/userinfo/removepayment/:payment_id
// @desc    Delete a Payment
// @access  Private
router.put("/removepayment/:payment_id", [auth], async (req, res) => {
  try {
    let userinfo = await UserInfo.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (userinfo) {
      // Get remove index
      const removeIndex = userinfo.payments
        .map(pm => pm._id.toString())
        .indexOf(req.params.payment_id);
      if (removeIndex != -1) {
        // Splice out of array
        userinfo.payments.splice(removeIndex, 1);
      } else {
        return res.status(404).json({ msg: "Payment not found" });
      }
    } else {
      return res.status(400).json({ msg: "No information for this user" });
    }

    await userinfo.save();

    res.json(userinfo);
  } catch (err) {
    console.log(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Payment not found" });
    }
    res.status(500).send("Server Error!");
  }
});

// @route       DELETE api/userinfo
// @Desc        Delete user and userinfo
// @Access      Private

module.exports = router;
