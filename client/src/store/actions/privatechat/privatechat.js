import {
  JOIN_PRIVATE_CHAT_ROOM,
  SEND_PRIVATE_MESSAGE,
  UPDATE_PRIVATE_CHAT_MESSAGE,
  RESET_PRIVATE_CHAT_MESSAGES,
  FETCH_PRIVATE_CHAT_MESSAGE
} from "../../types";
import axios from "axios";

export const joinPrivateChatRoom = rooms => dispatch => {
  dispatch({
    type: JOIN_PRIVATE_CHAT_ROOM,
    payload: rooms
  });
};

export const sendPrivateMessage = (message, sender, room) => async dispatch => {
  const data = {
    text: message,
    sender,
    room
  };

  // room will come as "ReceiverName.SenderName"
  const receiver = data.room.split(".")[0];
  console.log("From private chat action", receiver);
  try {
    const res = await axios.post("/api/privatechat/save", {
      sender: sender.fullname,
      receiver,
      message
    });
    //sets the id of the data
    data.id = res.data.id;
    dispatch({
      type: SEND_PRIVATE_MESSAGE,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchPrivateMessages = receiver => async dispatch => {
  //receiver refers to the next user who is involved with us in the conversation
  try {
    const res = await axios.get(`/api/privatechat/messages/${receiver}`);
    console.log("from private messages", res.data);
    dispatch({
      type: FETCH_PRIVATE_CHAT_MESSAGE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const resetPrivateMessages = () => dispatch => {
  dispatch({
    type: RESET_PRIVATE_CHAT_MESSAGES
  });
};

export const setMessageAsRead = messageId => async dispatch => {
  try {
    console.log("Set message as read is called on clinet", messageId);
    await axios.post("/api/privatechat/message/read", { messageId });
  } catch (error) {
    console.log(error);
  }
};
