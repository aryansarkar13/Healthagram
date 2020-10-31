const mongoose = require("mongoose");
const User = mongoose.model("users");
const uploader = require("../../services/cloudinaryUpload");
module.exports = router => {
  router.post(
    "/api/settings/user-image-upload",
    uploader.single("image"),
    (req, res) => {
      try {
        if (req.file && req.file.public_id) {
          const public_id = req.file.public_id;
          res.status(200).send(public_id);
        } else {
          throw new Error("Some error while uploading file");
        }
      } catch (err) {
        res.status(400).send(err);
      }
    }
  );

  router.post("/api/settings/profile", async (req, res) => {
    console.log("Profile save is called-Edit profile", req.body);
    try {
      await User.update(
        {
          _id: req.user._id
        },
        {
          username: req.body.username,
          fullname: req.body.fullname,
          description: req.body.description,
          blood_group: req.body.blood_group,
          gender: req.body.gender,
          userImage: req.body.userImage,
          country: req.body.country
        },
        {
          upsert: true
        }
      );
      res.status(200).send();
    } catch (err) {}
  });
};
