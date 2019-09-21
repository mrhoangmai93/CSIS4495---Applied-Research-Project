const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

// Load models
const Food = require("../../models/Food");

// @route   GET api/foods/all
// @desc    Get all foods
// @access  public
router.get("/", async (req, res) => {
  try {
    // TODO: sort to the closet location
    const foods = await Food.find();
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
    if (!food) {
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
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty(),
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
      check("imageUrls", "Need at least one image")
        .not()
        .isEmpty(),
      check("categoryList", "Category cannot be empty")
        .not()
        .isEmpty(),
      check("pickingUpAddress", "pickingUpAddress cannot be empty")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      food_id,
      name,
      title,
      description,
      price,
      quantity,
      imageUrls,
      categoryList,
      pickingUpAddress
    } = req.body;
    let images = [];
    let categories = [];
    try {
      // Urls - Spilt into array
      if (typeof imageUrls !== "undefined") {
        images = imageUrls.split(",");
      }
      if (typeof categoryList !== "undefined") {
        categories = categoryList.split(",");
      }

      if (food_id) {
        // update the old one
        let food = await Food.findById(food_id);

        if (food) {
          // update
          const newFood = {
            owner: req.user.id,
            name,
            title,
            description,
            price,
            quantity,
            images,
            categories,
            pickingUpAddress
          };
          food = await Food.findByIdAndUpdate(
            food_id,
            { $set: newFood },
            { new: true }
          );
          return res.json(food);
        } else {
          return res.status(404).json({ msg: "Food not found" });
        }
      }
      //create a new one
      const newFood = new Food({
        owner: req.user.id,
        name,
        title,
        description,
        price,
        quantity,
        images,
        categories,
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
