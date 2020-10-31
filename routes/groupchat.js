const mongoose = require("mongoose");
const GroupMessage = mongoose.model("groupmessages");

module.exports = router => {
  //Save a group message
  router.post("/api/group/save-message", async (req, res) => {
    console.log("Save group message route is called");
    try {
      const group = new GroupMessage();
      group.sender = req.user._id;
      group.body = req.body.message;
      group.name = req.body.groupname;
      await group.save();
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(400).send();
    }
  });

  //Get Group Chat messages
  router.get("/api/group/messages/:groupname", async (req, res) => {
    try {
      const groupmessages = await GroupMessage.find({
        name: req.params.groupname
      }).populate("sender");
      res.status(200).send(groupmessages);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });
};
