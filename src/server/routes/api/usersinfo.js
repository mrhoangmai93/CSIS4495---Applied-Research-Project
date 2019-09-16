const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");

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
      "users",
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

module.exports = router;
