const Users = require("../helpers/UsersClass");

module.exports = io => {
  const users = new Users();

  io.on("connection", socket => {
    console.log("User connected");

    socket.on("join", (params, callback) => {
      socket.join(params.room);

      users.AddUserData(
        socket.id,
        params.userId,
        params.name,
        params.image,
        params.room
      );

      // online members in a particular group
      console.log("From group chat server", users.GetUsersList(params.room));
      io.to(params.room).emit(
        "groupUsersList",
        users.GetUsersList(params.room)
      );

      console.log(users);
      callback();
    });

    socket.on("createMessage", data => {
      console.log("Create message is called");
      io.to(data.room).emit("newMessage", {
        text: data.text,
        room: data.room,
        from: data.sender.fullname,
        image: data.sender.userImage
      });
    });
    socket.on("leave", () => {
      const user = users.RemoveUser(socket.id);

      if (user) {
        io.to(user.room).emit("groupUsersList", users.GetUsersList(user.room));
      }
    });
    socket.on("disconnect", () => {
      const user = users.RemoveUser(socket.id);

      if (user) {
        io.to(user.room).emit("groupUsersList", users.GetUsersList(user.room));
      }
    });
  });
};
