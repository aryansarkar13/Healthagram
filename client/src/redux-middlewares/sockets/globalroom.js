const globalroom = (socket, types) => {
  return store => {
    socket.on("onlineUser", users => {
      store.dispatch({
        type: types.UPDATE_ONLINE_FRIENDS,
        payload: users
      });
    });
    return next => action => {
      //Joins the global room
      if (action.type === types.JOIN_GLOBAL_ROOM) {
        const room = "GlobalRoom";
        const fullname = action.payload.fullname;
        const image = action.payload.image;
        socket.emit("global room", {
          room,
          fullname,
          image
        });
      }
      return next(action);
    };
  };
};

export default globalroom;
