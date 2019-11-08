const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const authSeller = require("../../middleware/authSeller");
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
      "orderDetails.foods.foodId",
      ["title", "price", "images", "tags", "description", "owner"]
    );
    res.json(orders);
  } catch (err) {
    console.log(err.message);

    res.status(500).send("Server Error!");
  }
});
// @route   GET /api/orders/seller
// @desc    Get all pending orders of seller
// @access  Private
router.get("/seller", authSeller, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("orderDetails.foods.foodId", [
        "title",
        "price",
        "images",
        "tags",
        "description",
        "owner"
      ])
      .populate("user", ["name", "avatar", "email"]);
    if (!orders) {
      return res.status(404).json({ msg: "Order not found" });
    }
    const sellerOrders = orders.filter(
      od =>
        od.orderDetails.foods.filter(
          food => food.foodId.owner.toString() === req.user.id
        ).length > 0
    );
    if (sellerOrders.length === 0) {
      return res.status(404).json({ msg: "You have No order" });
    }
    const allOrders = {
      pendingOrders: sellerOrders.filter(od => od.orderStatus === "pending"),
      completedOrders: sellerOrders.filter(od => od.orderStatus === "completed")
    };

    res.json(allOrders);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
});
// @route   GET /api/orders/pending/seller
// @desc    Get all pending orders of seller
// @access  Private
router.get("/pending/seller", authSeller, async (req, res) => {
  try {
    const orders = await Order.find({ orderStatus: "pending" })
      .populate("orderDetails.foods.foodId", [
        "title",
        "price",
        "images",
        "tags",
        "description",
        "owner"
      ])
      .populate("user", ["name", "avatar", "email"]);
    if (!orders) {
      return res.status(404).json({ msg: "Order not found" });
    }
    const sellerOrders = orders.filter(
      od =>
        od.orderDetails.foods.filter(
          food => food.foodId.owner.toString() === req.user.id
        ).length > 0
    );
    if (sellerOrders.length === 0) {
      return res.status(404).json({ msg: "You have No order" });
    }

    res.json(sellerOrders);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
});
// @route   GET /api/orders/completed/seller
// @desc    Get all pending orders of seller
// @access  Private
router.get("/completed/seller", authSeller, async (req, res) => {
  try {
    const orders = await Order.find({ orderStatus: "completed" })
      .populate("orderDetails.foods.foodId", [
        "title",
        "price",
        "images",
        "tags",
        "description",
        "owner"
      ])
      .populate("user", ["name", "avatar", "email"]);
    if (!orders) {
      return res.status(404).json({ msg: "Order not found" });
    }
    const sellerOrders = orders.filter(
      od =>
        od.orderDetails.foods.filter(
          food => food.foodId.owner.toString() === req.user.id
        ).length > 0
    );
    if (sellerOrders.length === 0) {
      return res.status(404).json({ msg: "You have No order" });
    }
    res.json(sellerOrders);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!");
  }
});
// @route   GET /api/orders/getById/:orderId
// @desc    Get order by id
// @access  Private
router.get("/getById/:orderId", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Authorization denied!" });
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
      check("totalSummary", "Order total is required")
        .not()
        .isEmpty(),
      check("shippingAddress", "Shipping address cannot be empty")
        .not()
        .isJSON(),
      check("foods", "Order Details cannot be empty").isArray()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const orderStatus = "pending";
    const { paymentMethod, totalSummary, shippingAddress, foods } = req.body;
    const orderDetails = {
      foods,
      totalSummary
    };

    try {
      //create a new one
      const newOrder = new Order({
        user: req.user.id,
        paymentMethod,
        shippingAddress,
        orderStatus,
        orderDetails
      });
      const order = await newOrder.save();

      res.json(order);
    } catch (err) {
      console.log(err.message);

      res.status(500).send("Server Error!");
    }
  }
);
// @route   PUT /api/orders/getById/:orderId
// @desc    PUT order by id
// @access  Private
router.put("/update/:orderId", auth, async (req, res) => {
  const newOrder = req.body;
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.orderId },
      { $set: newOrder },
      { new: true }
    );
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
module.exports = router;
