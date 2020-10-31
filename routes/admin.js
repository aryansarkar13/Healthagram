const formidable = require("formidable");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const Group = mongoose.model("groups");
const uploader = require("../services/cloudinaryUpload");

module.exports = router => {
  router.post("/api/image-upload", uploader.single("image"), (req, res) => {
    //req.file.public_id is set from uploader.single("image") middleware
    const public_id = req.file.public_id;
    res.status(200).send(public_id);
  });

  router.post("/api/dashboard", async (req, res) => {
    const group = await Group.findOne({ name: req.body.name });
    if (group) {
      return res
        .status(400)
        .send({ message: "Group with provided name already exist" });
    }
    const newGroup = new Group({
      name: req.body.name,
      country: req.body.country,
      image: req.body.image
    });
    console.log(newGroup);
    try {
      await newGroup.save();
      res.status(200).send({ message: "Image is successfully created" });
    } catch (error) {
      console.log("This errors is from admin.js file");
      console.log(error);
    }
  });
};
