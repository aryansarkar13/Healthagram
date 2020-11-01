const mongoose = require("mongoose");

const groupMessageSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  body: {
    type: String
  },
  name: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("groupmessages", groupMessageSchema);
