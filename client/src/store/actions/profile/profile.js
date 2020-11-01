import axios from "axios";
import {
  UPDATE_PROFILE_LOGGEDIN,
  UPDATE_PROFILE_LOGGEDOUT,
  JOIN_GLOBAL_ROOM,
  UPDATE_LAST_PRIVATE_MESSAGES,
  UPDATE_KEYS
} from "store/types";

export const signUpFormSubmit = async (
  values,
  history,
  dispatch,
  SubmissionError
) => {
  try {
    console.log("Sign up form submit has been called");
    const response = await axios.post("/api/signup", values);
    console.log("From sign up formt submit", response);
    await dispatch(fetchUser());
    history.push("/home");
  } catch (err) {
    console.log(err);
    //Server side validation of redux form
    throw new SubmissionError(err.response.data);
  }
};
export const loginFormSubmit = async (
  values,
  history,
  dispatch,
  SubmissionError
) => {
  console.log(values);
  try {
    console.log("login form submit has been called");
    const response = await axios.post("/api/login", values);
    console.log("login has finished", history);
    await dispatch(fetchUser());
    history.push("/home");
  } catch (err) {
    //Server side validation of redux form
    console.log(err);
    throw new SubmissionError(err.response.data);
  }
};

export const fetchUser = () => async dispatch => {
  console.log("Fetch user is called");
  try {
    const userRes = axios.get("/api/get-user");
    const messagesRes = axios.get("/api/privatechat/lastmessages");
    const user = await userRes;
    const messages = await messagesRes;
    const response = { ...user.data, lastMessages: [...messages.data] };
    console.log("Refetch user is successfully called");
    dispatch({
      type: UPDATE_PROFILE_LOGGEDIN,
      payload: response
    });
    return;
    //receives all the last messages
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_LOGGEDOUT
    });
  }
};

export const joinGlobalRoom = user => async dispatch => {
  console.log("Join Global room is called");
  dispatch({
    type: JOIN_GLOBAL_ROOM,
    payload: user
  });
};

export const logoutUser = history => async dispatch => {
  try {
    await axios.get("/api/logout");
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

//Returns all the last messages of the chat
export const getLastMessages = () => async dispatch => {
  console.log("Get last messages is called");
  try {
    const res = await axios.get("/api/privatechat/lastmessages");
    dispatch({
      type: UPDATE_LAST_PRIVATE_MESSAGES,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchKeys = () => async dispatch => {
  try {
    const res = await axios.get("/api/keys");
    const keys = {
      cloudinary: {
        APIkey: res.data.cloudinaryApiKey,
        APISecret: res.data.cloudinaryApiSecret,
        uploadPreset: res.data.cloudinaryUploadPreset,
        name: res.data.cloudinaryName
      }
    };
    dispatch({
      type: UPDATE_KEYS,
      payload: keys
    });
    console.log("From fetch keys", res.data);
  } catch (error) {
    console.log(error);
  }
};
