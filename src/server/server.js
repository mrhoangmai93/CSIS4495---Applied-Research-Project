const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect to DB
connectDB();

//middleware
app.use(express.json({ extended: false }));

// Define Index
app.use("/api/users", require("./routes/api/users"));
app.use("/api/userinfo", require("./routes/api/usersinfo"));
app.use("/api/products", require("./routes/api/products"));
app.use("/api/auth", require("./routes/api/auth"));

app.get("/", (req, res) => res.send("Successfully set up API"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
