const express = require("express");
const connectDB = require("./config/db");

const app = express();
var bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(cors());

// connect to DB
connectDB();

// middleware
app.use(express.json({ extended: false }));

app.use("/api/upload", require("./routes/api/uploadImage"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/userinfo", require("./routes/api/usersinfo"));
app.use("/api/products", require("./routes/api/products"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/foods", require("./routes/api/food"));
app.use("/api/orders", require("./routes/api/order"));
app.use("/api/cart", require("./routes/api/cart"));
app.use("/api/seller", require("./routes/api/sellerProfile"));

app.get("/", (req, res) => res.send("Successfully set up API"));

//serve static access
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
