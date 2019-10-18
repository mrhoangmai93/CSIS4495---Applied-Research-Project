const express = require("express");
const connectDB = require("./config/db");

const app = express();
var bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors(), bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// connect to DB
connectDB();

// middleware
app.use(express.json({ extended: false }));

// Define Index
app.get("/api", function(req, res) {
  res.json("OK");
});

app.use("/api/users", require("./routes/api/users"));
app.use("/api/userinfo", require("./routes/api/usersinfo"));
app.use("/api/products", require("./routes/api/products"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/foods", require("./routes/api/food"));
app.use("/api/orders", require("./routes/api/order"));
app.use("/api/cart", require("./routes/api/cart"));
app.use("/api/seller", require("./routes/api/sellerProfile"));

app.get("/", (req, res) => res.send("Successfully set up API"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
