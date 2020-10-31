//node;
const Global = require("../helpers/Global");
const _ = require("lodash");

module.exports = io => {
  const clients = new Global();

  io.on("connection", socket => {
    socket.on("global room", global => {
      socket.join(global.room);

      clients.EnterRoom(socket.id, global.fullname, global.room, global.image);

      const nameProp = clients.GetRoomList(global.room);
      const arr = _.uniqBy(nameProp, "name");

      io.to(global.room).emit("onlineUser", arr);
    });

    socket.on("disconnect", () => {
      const user = clients.RemoveUser(socket.id);
      if (user) {
        const userData = clients.GetRoomList(user.room);
        const arr = _.uniqBy(userData, "name");
        const removeData = _.remove(arr, { name: user.name });
        io.to(user.room).emit("onlineUser", arr);
      }
    });
  });
};
