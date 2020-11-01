import {
  UPDATE_POSTS_LISTS,
  UPDATE_POSTS_SCROLLABLE,
  UPDATE_SINGLE_POST,
  PUT_SINGLE_POST_TO_TOP,
  HIDE_POST,
  RESET_POSTS
} from "store/types";
import update from "immutability-helper";

const initialState = {
  list: [],
  scrollable: true
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_POSTS_LISTS:
      return { ...state, list: [...state.list, ...payload] };

    case UPDATE_POSTS_SCROLLABLE:
      return { ...state, scrollable: payload };

    case RESET_POSTS:
      return { ...state, list: [], scrollable: true };

    case UPDATE_SINGLE_POST:
      return update(state, {
        list: {
          [payload.index]: {
            $set: payload.post
          }
        }
      });

    case HIDE_POST:
      return update(state, { list: { $splice: [[payload.index, 1]] } });

    case PUT_SINGLE_POST_TO_TOP:
      return {
        ...state,
        list: [payload, ...state.list]
      };
    default:
      return state;
  }
};
