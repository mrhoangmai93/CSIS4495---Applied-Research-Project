const mongoose = require("mongoose");

const config = require("config");
const db = config.get("mongoURI");

const connectToDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("mongoDB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
