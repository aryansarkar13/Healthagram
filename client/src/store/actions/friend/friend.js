import {
  JOIN_REQUEST,
  FRIEND_REQUEST,
  FRIEND_REQUEST_RESPONDED,
  UPDATE_PROFILE_LOGGEDIN,
  UPDATE_PROFILE_FRIENDS
} from "store/types";
import axios from "axios";
import { fetchUser } from "store/actions/profile/profile";

export const joinRequest = sender => dispatch => {
  console.log("Friend join Request is being called");
  //dispatched action is called in sendrequest socket middleware
  dispatch({
    type: JOIN_REQUEST,
    payload: sender
  });
};

export const sendFriendRequest = data => async dispatch => {
  console.log("send Friend Request is called", data);
  try {
    await axios.post("/api/send-friend-request", {
      receiver: data.receiver
    });
    dispatch({
      type: FRIEND_REQUEST,
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};

export const acceptFriendRequest = data => async dispatch => {
  console.log("Accept Friend request is called", data);
  try {
    const res = await axios.post("/api/accept-friend-request", data);
    //calls the actions in socket middleware
    //sender refers to request sender
    dispatch({
      type: FRIEND_REQUEST_RESPONDED,
      payload: res.data.sender
    });
  } catch (error) {
    console.log(error);
  }
};

export const rejectFriendRequest = data => async dispatch => {
  console.log("Reject friend request is called", data);
  try {
    const res = await axios.post("/api/reject-friend-request", data);
    dispatch({
      type: FRIEND_REQUEST_RESPONDED,
      payload: res.data.sender
    });
  } catch (error) {
    console.log(error);
  }
};

export const acceptFriendRequestRead = id => async dispatch => {
  try {
    console.log("Accept friend request read is called", id);
    const res = await axios.post("/api/friend-request/read", { id });
    console.log("acceotFrinedRequestRead", res.data);
    dispatch(fetchUser());
  } catch (error) {}
};
