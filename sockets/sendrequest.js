//node;

module.exports = io => {
  io.on("connection", socket => {
    socket.on("joinRequest", (sender, callback) => {
      socket.join(sender);
      callback();
    });

    socket.on("friendRequest", async (friend, callback) => {
      io.to(friend.receiver).emit("newFriendRequest", {
        from: friend.sender,
        message: "This is a friend request sent"
      });
      callback();
    });

    socket.on("friendRequestResponded", async (requestSender, callback) => {
      console.log("friend request accepted/rejected is called", requestSender);
      io.to(requestSender).emit("refetchUser");
    });
  });
};
