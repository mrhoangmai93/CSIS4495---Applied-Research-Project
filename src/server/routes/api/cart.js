const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

// Load User model
const User = require("../../models/User");
const Cart = require("../../models/Cart");
const Food = require("../../models/Food");

// @route   GET api/cart
// @desc    Get cart of current user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "foods.foodId",
      ["name", "title", "price"]
    );
    if (!cart) {
      // Create a new one
      const newCart = new Cart({ user: req.user.id });
      await newCart.save();
      return res.json(newCart);
    }
    res.json(cart);
  } catch (err) {
    console.log(err.message);

    res.status(500).send("Server Error!");
  }
});
// @route   POST api/cart
// @desc    Create cart
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      //return cart data
      res.json(cart);
    } else {
      // Create
      const newCart = new Cart({ user: req.user.id });
      const cart = await newCart.save();
      res.json(cart);
    }
  } catch (err) {
    console.log(err.message);

    res.status(500).send("Server Error!");
  }
});
// @route   POST api/cart/add/:foodId/:quantity
// @desc    Add food to cart
// @param    foodId id of food add to cart
// @param    quantity quantity of food want to update
//                      can be positive or negative
// @access  Private
router.post("/add/:foodId/:quantity", auth, async (req, res) => {
  try {
    const food = await Food.findOne({ _id: req.params.foodId });
    if (!food) {
      return res.status(404).json({ msg: "Food not found" });
    }
    // check if there are enough quantity to add to cart
    if (parseInt(food.quantity) > req.params.quantity) {
      const cart = await Cart.findOne({ user: req.user.id });
      if (!cart) {
        return res.status(404).json({ msg: "Cart not found" });
      }
      // Check to see if item exists
      if (
        cart.foods.filter(
          item => item.foodId._id.toString() === req.params.foodId
        ).length === 0
      ) {
        const newItem = {
          foodId: req.params.foodId,
          quantity: req.params.quantity
        };
        // Add item to cart
        cart.foods.unshift(newItem);

        // Save
        await cart.save();
        res.json(cart);
      } else {
        const updateIndex = cart.foods
          .map(item => item.foodId.toString())
          .indexOf(req.params.foodId);
        const totalItem =
          parseInt(cart.foods[updateIndex].quantity) +
          parseInt(req.params.quantity);
        cart.foods[updateIndex].quantity = totalItem;
        // Save
        await cart.save();
        res.json(cart);
      }
    } else {
      res.status(400).json({
        msg: "This product is out of stock or not enough products"
      });
    }
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Food not found" });
    }
    res.status(500).send("Server Error!");
  }
});
// @route   Delete api/cart/delete/:item
// @desc    delete a food in cart
// @access  Private
router.delete("/delete/:foodId", auth, async (req, res) => {
  try {
    //const food = await Food.findOne({ _id: req.params.foodId });
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ msg: "No cart found" });
    }

    // Check to see if item exists
    if (
      cart.items.filter(item => item.foodId.toString() === req.params.foodId)
        .length === 0
    ) {
      return res.status(404).json({ msg: "No Food found" });
    } else {
      const removeIndex = cart.items
        .map(item => item.foodId.toString())
        .indexOf(req.params.foodId);

      // Splice out of array
      cart.items.splice(removeIndex, 1);

      // Save
      await cart.save();
      res.json(cart);
    }
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Food not found" });
    }
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
