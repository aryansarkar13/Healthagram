const mongoose = require("mongoose");
const User = mongoose.model("users");
const Message = mongoose.model("messages");

module.exports = router => {
  router.get("/api/privatechat/lastmessages", async (req, res) => {
    // const user = await User.findOne({ username: req.user.username }).populate(
    //   "request.userId"
    // );
    try {
      const messages = await Message.aggregate([
        {
          $match: {
            $or: [
              { senderName: req.user.username },
              { receiverName: req.user.username }
            ]
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        },
        {
          $group: {
            _id: {
              last_message_between: {
                $cond: [
                  {
                    $gt: ["$senderName", "$receiverName"]
                  },
                  { $concat: ["$senderName", " and ", "$receiverName"] },
                  { $concat: ["$receiverName", " and ", "$senderName"] }
                ]
              }
            },
            body: { $first: "$$ROOT" }
          }
        }
      ]);
      res.status(200).send(messages);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  router.get("/api/privatechat/messages/:name", async (req, res) => {
    try {
      // const message = await Message.find({
      //   $or: [
      //     { senderName: req.user.username },
      //     { receiverName: req.user.username }
      //   ]
      // })
      //   .populate("sender")
      //   .populate("receiver");
      // res.status(200).send(message);

      //Data comes in the format ReceiverName1.SenderName
      const user = req.params.name;

      const aggregatedMessage = await Message.aggregate([
        {
          $match: {
            $or: [
              { senderName: req.user.username, receiverName: user },
              { senderName: user, receiverName: req.user.username }
            ]
          }
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            text: "$message",
            sender: "$sender"
          }
        }
      ]);
      const messages = await Message.populate(aggregatedMessage, {
        path: "sender"
      });
      res.status(200).send(messages);
    } catch (err) {
      console.log(err);
    }
  });
  router.post("/api/privatechat/save", async (req, res) => {
    //sender receiver message
    console.log("Private chat save route is called", req.body);
    if (!req.body.message || !req.body.sender || !req.body.receiver) {
      res
        .status(400)
        .send({ msg: "Please provide all the necessary elements" });
    }

    //for receiver
    try {
      const receiver = await User.findOne({ username: req.body.receiver });
      const newMessage = new Message();
      newMessage.sender = req.user._id;
      newMessage.receiver = receiver._id;
      newMessage.senderName = req.user.username;
      newMessage.receiverName = receiver.username;
      newMessage.message = req.body.message;
      newMessage.userImage = req.user.userImage;
      newMessage.createdAt = new Date();
      const message = await newMessage.save();
      res.status(200).send({ id: message.id });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  router.post("/api/privatechat/message/read", async (req, res) => {
    if (req.body.messageId) {
      console.log("Set messsage as read on server is called");
      try {
        await Message.update(
          {
            _id: req.body.messageId
          },
          {
            isRead: true
          }
        );
        console.log("Message is set as read");
        res.status(200).send();
      } catch (err) {
        console.log(err);
        res.status(400).send();
      }
    }
  });
};
