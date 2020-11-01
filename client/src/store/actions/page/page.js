import { UPDATE_PAGE_NAME } from "store/types";

export const updatePageName = name => dispatch => {
  dispatch({
    type: UPDATE_PAGE_NAME,
    payload: name
  });
};
