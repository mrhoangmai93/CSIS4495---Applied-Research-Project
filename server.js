const express = require("express");
const connectDB = require("./config/db");

const app = express();

//connect to DB
connectDB();

app.get("/", (req, res) => res.send("Successfully set up API"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
