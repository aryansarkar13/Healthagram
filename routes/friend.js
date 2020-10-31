const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = router => {
  // send friend request
  router.post("/api/send-friend-request", async (req, res) => {
    console.log("Friend request route is called");
    if (req.body.receiver) {
      try {
        const receiverUpdate = User.update(
          {
            username: req.body.receiver,
            "request.userId": { $ne: req.user._id },
            "friendsList.friendId": { $ne: req.user._id }
          },
          {
            $push: {
              requests: {
                userId: req.user._id,
                username: req.user.username
              }
            },
            $inc: { totalRequest: 1 }
          }
        );

        //prevents sending the request to ourself
        const senderUpdate = User.update(
          {
            username: req.user.username,
            "sentRequest.username": { $ne: req.body.receiver }
          },
          {
            $push: {
              sentRequest: {
                username: req.body.receiver
              }
            }
          }
        );

        await senderUpdate;
        await receiverUpdate;

        res.status(200).send({ message: "Successfully updated" });
      } catch (err) {
        console.log(err);
      }
    }
  });

  // accept friend request
  router.post("/api/accept-friend-request", async (req, res) => {
    console.log("Accpet friend request route is called", req.body);
    if (req.body.senderId) {
      try {
        //This function updates the receiver of the friend request when it is accepted
        const receiverUpdate = User.findOneAndUpdate(
          {
            _id: req.user._id,
            "friendsList.friendId": { $ne: req.body.senderId }
          },
          {
            $push: {
              friendsList: {
                friendId: req.body.senderId,
                friendName: req.body.sender
              }
            },
            $pull: {
              requests: {
                userId: req.body.senderId,
                username: req.body.sender
              }
            },
            $inc: {
              totalRequest: -1
            }
          }
        );

        //This function is called for the sender of the friend request
        const senderUpdate = User.findOneAndUpdate(
          {
            _id: req.body.senderId,
            "friendsList.friendId": { $ne: req.user._id }
          },
          {
            $push: {
              friendsList: {
                friendId: req.user._id,
                friendName: req.user.username
              }
            },
            $pull: {
              sentRequest: {
                username: req.user.username
              }
            }
          }
        );
        await receiverUpdate;
        await senderUpdate;
        //sends the user name so that friend request sender can be notified the request is accepted
        //real time
        res.status(200).send({ sender: req.body.sender });
      } catch (err) {
        res.status(400).send(err);
      }
    }
  });

  //reject friend request
  router.post("/api/reject-friend-request", async (req, res) => {
    if (req.body.senderId) {
      try {
        const senderUpdate = User.findOneAndUpdate(
          {
            _id: req.body.senderId,
            "sentRequest.username": { $eq: req.user.username }
          },
          {
            $pull: {
              sentRequest: {
                username: req.user.username
              }
            }
          }
        );

        const receiverUpdate = User.findOneAndUpdate(
          {
            _id: req.user._id,
            "requests.userId": { $eq: req.body.senderId }
          },
          {
            $pull: {
              requests: {
                userId: req.body.senderId
              }
            },
            $inc: {
              totalRequest: -1
            }
          }
        );
        await senderUpdate;
        await receiverUpdate;
        //sends the user name so that friend request sender can be notified the request is rejected
        //real time
        res.status(200).send({ sender: req.body.sender });
      } catch (err) {
        console.log(err);
      }
    }
  });

  //set friend request notification as read
  router.post("/api/friend-request/read", async (req, res) => {
    console.log("Friend request read is called");
    const friendId = req.body.id;
    console.log(friendId);
    try {
      const response = await User.findOneAndUpdate(
        {
          _id: req.user._id,
          "friendsList.friendId": { $eq: friendId }
        },
        { $push: { "friendsList.$.readBy": { user: req.user.id } } },
        {
          new: true
        }
      );
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
    }
  });
};
