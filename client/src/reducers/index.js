import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import forumReducer from './forumReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  forum: forumReducer,
});