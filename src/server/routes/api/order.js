const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

// Load order Model
const Order = require("../../models/Order");
// Load user Model
const User = require("../../models/User");

// @route       GET api/order/test
// @Desc        Test profile routes
// @Access      Public

router.get("/test", (req, res) => res.json({ msg: "Order Works" }));

// @route   GET /api/orders
// @desc    Get all orders of current user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "orderDetail.items.itemId",
      ["name", "title", "price"]
    );
    res.json(orders);
  } catch (err) {
    console.log(err.message);

    res.status(500).send("Server Error!");
  }
});
// @route   GET /api/orders/:orderId
// @desc    Get order by id
// @access  Private
router.get("/:orderId", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Order not found" });
    }
    res.status(500).send("Server Error!");
  }
});
// @route       POST /api/orders
// @Desc        Add new order
// @Access      Private

router.post(
  "/",
  [
    auth,
    [
      check("paymentMethod", "Payment methos is required")
        .not()
        .isEmpty(),
      check("orderTotal", "Order total is required").isNumeric(),
      check("shippingAddress", "Shipping address cannot be empty")
        .not()
        .isJSON(),
      check("items", "Order Details cannot be empty").isArray()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const orderStatus = "pending";
    const { paymentMethod, orderTotal, shippingAddress, items } = req.body;
    const orderDetail = {
      items,
      orderTotal
    };

    try {
      //create a new one
      const newOrder = new Order({
        user: req.user.id,
        paymentMethod,
        shippingAddress,
        orderStatus,
        orderDetail
      });
      const order = await newOrder.save();

      res.json(order);
    } catch (err) {
      console.log(err.message);

      res.status(500).send("Server Error!");
    }
  }
);

module.exports = router;
