import axios from "axios";
import { UPDATE_LOCAL_USER_IMAGE } from "../../types";

export const saveUserImage = file => async dispatch => {
  console.log("Save User image is called");
  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await axios.post("/api/settings/user-image-upload", formData);
    //Returns the id of image saved in server
    return res.data;
  } catch (err) {}
};

export const saveUserProfile = data => async dispatch => {
  try {
    await axios.post("/api/settings/profile", data);
    console.log("User profile is successfully updated");
  } catch (error) {
    console.log(error);
  }
};

export const updateLocalUserImage = userImage => async dispatch => {
  dispatch({
    type: UPDATE_LOCAL_USER_IMAGE,
    payload: userImage
  });
};
