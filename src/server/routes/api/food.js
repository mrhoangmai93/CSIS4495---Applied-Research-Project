const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const authSeller = require("../../middleware/authSeller");

const Promise = require("bluebird");
const SellerProfile = require("../../models/SellerProfile");
// Load models
const Food = require("../../models/Food");
const User = require("../../models/User");
// @route   GET api/foods/
// @desc    Get all foods
// @access  public
router.get("/", async (req, res) => {
  try {
    // TODO: sort to the closet location
    const foods = await Food.find({ active: true }).populate("owner", [
      "name",
      "avatar",
      "email"
    ]);
    // const foodWithSellers = Promise.all(
    //   foods.map(async food => {
    //     const sellerProfile = await SellerProfile.findOne({
    //       user: food.owner
    //     }).exec();
    //     return { ...food, sellerFb: sellerProfile.feedbacks };
    //   })
    // );
    res.json(foods);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
});
// @route   GET api/foods/seller
// @desc    Get all foods
// @access  private
router.get("/seller", auth, async (req, res) => {
  try {
    const foods = await Food.find({ owner: req.user.id }).populate("owner", [
      "name",
      "avatar",
      "email"
    ]);
    res.json(foods);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
});
// @route   GET api/foods/seller/:id
// @desc    Get all foods
// @access  private
router.get("/seller/:id", async (req, res) => {
  try {
    const foods = await Food.find({ owner: req.params.id }).populate("owner", [
      "name",
      "avatar",
      "email"
    ]);
    res.json(foods);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
});
// @route   GET api/foods/:food_id
// @desc    Get food by id
// @access  public

router.get("/:food_id", async (req, res) => {
  try {
    // TODO: sort to the closet location
    const food = await Food.findById(req.params.food_id);
    if (!food || food.active === false) {
      return res.status(404).json({ msg: "Food not found" });
    }

    res.json(food);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Food not found" });
    }
    res.status(500).send("Server Error!");
  }
});
// @route   POST api/foods/addfood
// @desc    add a new food
// @access  Private
router.post(
  "/addfood",
  [
    authSeller,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("description", "Description is required")
        .not()
        .isEmpty(),
      check("price", "Price is required")
        .not()
        .isEmpty(),
      check("quantity", "Quantity is required")
        .not()
        .isEmpty(),
      check("images", "Need at least one image")
        .not()
        .isEmpty(),
      check("pickingUpAddress", "pickingUpAddress cannot be empty")
        .not()
        .isEmpty(),
      check("active", "active must be boolean").isBoolean()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      food_id,
      title,
      description,
      price,
      quantity,
      images,
      active,
      tags,
      pickingUpAddress
    } = req.body;

    try {
      // Urls - Spilt into array
      /*      if (typeof imageUrls !== 'undefined') {
        images = imageUrls.split(',');
      }
      if (typeof categoryList !== 'undefined') {
        categories = categoryList.split(',');
      } */
      if (food_id) {
        // update the old one
        let food = await Food.findById(food_id);

        if (food) {
          // update
          const newFood = {
            owner: req.user.id,
            title,
            description,
            price,
            quantity,
            images,
            tags,
            active,
            pickingUpAddress
          };
          food = await Food.findByIdAndUpdate(
            food_id,
            { $set: newFood },
            { new: true }
          );
          return res.json(food);
        }
        return res.status(404).json({ msg: "Food not found" });
      }
      // create a new one
      const newFood = new Food({
        owner: req.user.id,
        title,
        description,
        price,
        quantity,
        images,
        active,
        tags,
        pickingUpAddress
      });
      const food = await newFood.save();
      res.json(food);
    } catch (err) {
      console.log(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Food not found" });
      }
      res.status(500).send("Server Error!");
    }
  }
);

// @route       DELETE api/foods/delete/:food_id
// @Desc        Delete a food
// @Access      Private

router.delete("/delete/:food_id", auth, async (req, res) => {
  try {
    const food = await Food.findById(req.params.food_id);

    if (!food) {
      return res.status(404).json({ msg: "Food not found" });
    }

    if (food.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await food.remove();
    res.json({ msg: "Food removed!" });
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Food not found" });
    }
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
