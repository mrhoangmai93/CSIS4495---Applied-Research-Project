const format = require("util").format;
const express = require("express");
const router = express.Router();
const Multer = require("multer");
// const helmet = require('helmet');
const path = require("path");
const { Storage } = require("@google-cloud/storage"); // google cloud sdk

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

const bucketname = "4495_project";
const gc = new Storage({
  keyFilename: path.join(__dirname, "../../config/Csis4270-ba35b47de322.json"),
  projectId: "extended-legend-255521"
});
// A bucket is a container for objects (files).
const bucket = gc.bucket(bucketname);
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Process the file upload and upload to Google Cloud Storage.
router.post("/uploadImage", multer.single("file"), (req, res, next) => {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(Date.now() + "_" + req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on("error", err => {
    next(err);
  });

  blobStream.on("finish", () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = format(
      `https://storage.googleapis.com/${bucketname}/${blob.name}`
    );
    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

module.exports = router;
