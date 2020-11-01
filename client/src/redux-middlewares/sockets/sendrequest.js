//react
const sendrequest = (socket, types, actions) => {
  return store => {
    //received the friend request
    socket.on("newFriendRequest", data => {
      //We are going to update the whole user of the profile
      console.log("New friend request is received", data);

      //fetch User updates the profile state of reducer
      store.dispatch(actions.fetchUser());
    });

    socket.on("refetchUser", () => {
      console.log("refetchUser us called");
      store.dispatch(actions.fetchUser());
    });

    socket.on("friendRequestResponded", () => {
      store.dispatch(actions.fetchUser());
    });
    return next => action => {
      //joinRequest
      if (action.type === types.JOIN_REQUEST) {
        //action.payload received the sender name
        socket.emit("joinRequest", action.payload, () => {
          console.log("Joined to joinRequest");
        });
      }

      //friend request
      if (action.type === types.FRIEND_REQUEST) {
        socket.emit("friendRequest", action.payload, () => {
          store.dispatch(actions.fetchUser());
        });
      }

      //friend request accepted
      if (action.type === types.FRIEND_REQUEST_RESPONDED) {
        console.log("Friend request accept is called");
        store.dispatch(actions.fetchUser());
        //action.payload contains sender of the request so that he can be notfied real time request is accepted or rejected
        socket.emit("friendRequestResponded", action.payload);
      }
      return next(action);
    };
  };
};

export default sendrequest;
