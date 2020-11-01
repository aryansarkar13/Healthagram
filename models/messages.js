const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  message: {
    type: String
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  senderName: {
    type: String
  },
  receiverName: {
    type: String
  },
  userImage: {
    type: String,
    default: "defaultPic.png"
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("messages", messageSchema);
