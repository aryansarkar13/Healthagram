import { UPDATE_PAGE_NAME } from "store/types";

const initialState = {
  name: ""
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PAGE_NAME:
      return { ...state, name: payload };

    default:
      return state;
  }
};
