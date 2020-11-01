import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";
import groupReducer from "store/reducers/groupReducer";
import profileReducer from "store/reducers/profileReducer";
import groupchatReducer from "store/reducers/groupchatReducer";
import privatechatReducer from "store/reducers/privatechatReducer";
import pageReducer from "store/reducers/pageReducer";
import postsReducer from "./postsReducer";

export default combineReducers({
  form: formReducer,
  profile: profileReducer,
  //Contains the list of chat groups
  group: groupReducer,
  groupchat: groupchatReducer,
  privatechat: privatechatReducer,
  page: pageReducer,
  posts: postsReducer
});
