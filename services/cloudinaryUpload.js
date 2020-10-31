const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const keys = require("../config/keys");

cloudinary.config({
  cloud_name: keys.cloudinaryName,
  api_key: keys.cloudinaryApiKey,
  api_secret: keys.cloudinaryApiSecret
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "chat-app",
  allowedFormats: ["jpg", "png"],
  use_filename: true,
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const uploader = multer({ storage: storage });

module.exports = uploader;
