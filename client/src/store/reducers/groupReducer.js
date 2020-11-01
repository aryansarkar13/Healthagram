import {
  UPDATE_GROUP,
  UPDATE_GROUP_FILTER_COUNTRY,
  UPDATE_GROUP_FILTER_TEXT
} from "store/types";

const defaultState = {
  lists: [],
  countries: [],
  filter: {
    country: "",
    text: ""
  }
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_GROUP:
      return {
        ...state,
        lists: action.payload.lists,
        countries: action.payload.countries
      };
    case UPDATE_GROUP_FILTER_COUNTRY:
      return {
        ...state,
        filter: {
          ...state.filter,
          country: action.payload
        }
      };
    case UPDATE_GROUP_FILTER_TEXT:
      return {
        ...state,
        filter: {
          ...state.filter,
          text: action.payload
        }
      };
    default:
      return state;
  }
};
