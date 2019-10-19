const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
//const isEmpty = require("../../../validation/is-empty");
// Load Info Model
const SellerProfile = require("../../models/SellerProfile");
// Load user Model
const User = require("../../models/User");

// @route   GET api/seller/:sellerId
// @desc    Get current users profile
// @access  Private
router.get("/:sellerId", async (req, res) => {
  try {
    const sellerInfo = await SellerProfile.findOne({
      user: req.params.sellerId
    }).populate("user", ["name", "avatar", "role", "email"]);
    if (!sellerInfo) {
      return res
        .status(404)
        .json({ msg: "There is no information for this user" });
    }
    res.json(sellerInfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/seller
// @desc    CREATE or UPDATE user information
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("userName", "User Name is required")
        .not()
        .isEmpty(),
      check("bio", "Bio is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      userName,
      bio,
      website,
      twitter,
      youtube,
      facebook,
      instagram
    } = req.body;

    //build sellerInfo object
    const userInf = {};
    let socials = {};

    userInf.user = req.user.id;
    userInf.userName = userName;
    userInf.bio = bio;

    if (website) userInf.website = website;
    if (twitter) socials.twitter = twitter;
    if (facebook) socials.facebook = facebook;
    if (instagram) socials.instagram = instagram;
    if (youtube) socials.youtube = youtube;
    userInf.socials = socials;

    try {
      let sellerProfile = await SellerProfile.findOne({
        user: req.user.id
      }).populate("user", ["name", "avatar", "role", "email"]);
      // if (sellerProfile || sellerProfile.role !== "seller") {
      //   return res.status(404).json({ msg: "Not Authorize" });
      // }
      if (sellerProfile) {
        // update
        sellerProfile = await SellerProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: userInf },
          { new: true }
        );
        return res.json(sellerProfile);
      }
      sellerProfile = new SellerProfile(userInf);

      await sellerProfile.save();
      res.json(sellerProfile);
    } catch (err) {
      console.log(err.message);

      res.status(500).send("Server Error!");
    }
  }
);
// @route   PUT api/seller/feedback/:sellerId"
// @desc    Add/update feedback
// @access  Private
router.put(
  "/feedback/:sellerId",
  [
    auth,
    [
      check("text", "Feedback Content is required")
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

    const { user, text, name, avatar } = req.body;

    //build userInfo object
    const newFeedback = {
      user,
      text,
      name,
      avatar
    };
    try {
      let sellerProfile = await SellerProfile.findOne({
        user: req.params.sellerId
      }).populate("user", ["name", "avatar", "email", "role"]);

      if (sellerProfile) {
        //check if there is feedbacks
        if (sellerProfile.feedbacks) {
          const updateIndex = sellerProfile.feedbacks
            .map(fb => fb.user.toString())
            .indexOf(req.user.id);
          if (updateIndex >= 0) {
            sellerProfile.feedbacks[updateIndex] = newFeedback;
          } else {
            sellerProfile.feedbacks.push(newFeedback);
          }
        } else {
          //no previous payment added
          sellerProfile.feedbacks = [];
          sellerProfile.feedbacks.push(newFeedback);
        }
      } else {
        return res.status(400).json({ msg: "No information for this user" });
      }

      await sellerProfile.save();

      res.json(sellerProfile);
    } catch (err) {
      console.log(err.message);

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
      const removeIndex = userinfo.feedbacks
        .map(fb => fb._id.toString())
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
