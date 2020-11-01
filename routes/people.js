const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = router => {
  router.get("/api/findpeople/:searchText", async (req, res) => {
    console.log("Find people have been called", req.params.searchText);
    console.log("hello " + req.params);
    const regex = `^${req.params.searchText}`;
    try {
      const people = await User.find({
        $or: [
          {
            blood_group: { $regex: regex, $options: "i" }
          },
          {
            locality: { $regex: regex, $options: "i" }
          },
          
        ]
      });
      console.log(people);
      res.status(200).send(people);
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/api/getpeople/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      res.status(200).send(user);
    } catch (error) {
      console.log("from people.js", error);
      res.status(400).send(error);
    }
  });
};
