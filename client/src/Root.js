import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./store/reducers/reducers";
import reduxThunk from "redux-thunk";
import socket from "services/socket";
import * as types from "store/types";
import chatgroup from "redux-middlewares/sockets/chatgroup";
import sendrequest from "redux-middlewares/sockets/sendrequest";
import globalroom from "redux-middlewares/sockets/globalroom";
import { fetchUser, getLastMessages } from "store/actions/profile/profile";
import privatemessage from "redux-middlewares/sockets/privatemessage";

//Important actions which are repeatedly needed in reducer
const actions = {
  fetchUser,
  getLastMessages
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ({ children, initialState = {} }) => {
  return (
    <Provider
      store={createStore(
        reducers,
        initialState,
        composeEnhancers(
          applyMiddleware(
            reduxThunk,
            chatgroup(socket, types),
            sendrequest(socket, types, actions),
            globalroom(socket, types),
            privatemessage(socket, types, actions)
          )
        )
      )}
    >
      {children}
    </Provider>
  );
};
