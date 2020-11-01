import {
  UPDATE_PRIVATE_CHAT_MESSAGE,
  FETCH_PRIVATE_CHAT_MESSAGE,
  RESET_PRIVATE_CHAT_MESSAGES
} from "store/types";

const initialState = {
  messages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PRIVATE_CHAT_MESSAGE:
      return {
        ...state,
        messages: [...state.messages.slice(), action.payload]
      };
    case FETCH_PRIVATE_CHAT_MESSAGE:
      return {
        ...state,
        messages: action.payload
      };
    case RESET_PRIVATE_CHAT_MESSAGES:
      return {
        ...state,
        messages: []
      };
    default:
      return state;
  }
};
