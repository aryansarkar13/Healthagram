import axios from "axios";
import {
  UPDATE_GROUP,
  UPDATE_GROUP_FILTER_COUNTRY,
  UPDATE_GROUP_FILTER_TEXT
} from "store/types";

export const fetchGroups = () => async dispatch => {
  try {
    const res = await axios.get("/api/groups");
    dispatch({
      type: UPDATE_GROUP,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    //TODO update the error list
  }
};

export const addGroupToFavourite = data => async dispatch => {
  console.log("Add Group to Favourite called");
  try {
    await axios.post("/api/group/add-to-favourite", data);

    console.log("Group added to favourite");
  } catch (error) {}
};

//Updates the country option of filter. So groups of selected countries will be only shown
export const updateGroupFilterCountry = country => async dispatch => {
  console.log("update group filter is called", country);
  dispatch({
    type: UPDATE_GROUP_FILTER_COUNTRY,
    payload: country
  });
};

export const updateGroupFilterText = text => async dispatch => {
  console.log("update group filter text is called", text);
  dispatch({
    type: UPDATE_GROUP_FILTER_TEXT,
    payload: text
  });
};

export const saveGroupMessage = (groupname, message) => async dispatch => {
  console.log("Save Group message is caleld");
  try {
    await axios.post("/api/group/save-message", { groupname, message });
  } catch (err) {
    console.log(err);
  }
};
