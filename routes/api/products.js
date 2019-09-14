const express = require("express");
const router = express.Router();

// @route       GET api/products
// @desc        Test route
// @access      Public
router.get("/", (req, res) => res.send("products Route"));

module.exports = router;
