const express = require("express");

const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
// Load User model
const User = require("../../models/User");
const SellerProfile = require("../../models/SellerProfile");
const UserInfo = require("../../models/UserInfo");
const Cart = require("../../models/Cart");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post(
  "/register/:userRole",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more charaters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const role = req.params.userRole;

    if (!(role === "user" || role === "seller")) {
      return res.status(400).json({ errors: [{ msg: "Cannot complete" }] });
    }
    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password,
        role
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const newCart = new Cart({ user: user.id });
      await newCart.save();

      const userinfo = new UserInfo({ user: user.id });

      await userinfo.save();

      if (role === "seller") {
        const sellerProfile = new SellerProfile({
          user: user.id,
          userName: name,
          bio: ""
        });
        await sellerProfile.save();
      }
      const payload = {
        user: {
          id: user.id,
          role
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error!");
    }
  }
);
// @route   POST api/users/changepassword
// @desc    Change password
// @access  Private
router.post(
  "/changepassword",
  [
    auth,
    [
      check("oldPassword", "Old Password is required")
        .not()
        .isEmpty(),
      check("password", "Password is required")
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
    // Check Validation

    const password = req.body.password;
    const oldPassword = req.body.oldPassword;
    // Find user by id
    const user = await User.findOne({ _id: req.user.id });

    // Check Password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (isMatch) {
      // User Matched
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();
      return res.status(200).json({ msg: "Success Change Password" });
    } else {
      res.status(400).json({ errors: [{ msg: "Password incorrect!" }] });
    }
  }
);
module.exports = router;
