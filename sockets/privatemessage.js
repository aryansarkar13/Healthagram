module.exports = io => {
  io.on("connection", socket => {
    socket.on("join PM", rooms => {
      console.log("Join private message is called");
      socket.join(rooms.room1);
      socket.join(rooms.room2);
    });

    socket.on("private message", message => {
      io.to(message.room).emit("new message", {
        text: message.text,
        sender: message.sender,
        id: message.id
      });

      //Updates the message in the notification
      io.emit("message display");
    });
  });
};
