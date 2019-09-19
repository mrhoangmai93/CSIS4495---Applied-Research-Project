import { combineReducers } from "redux";
import test from "./front/test.reducer";
import alert from "./libs/alert.reducer";
import auth from "./libs/auth.reducer";

export default combineReducers({
  test,
  alert,
  auth
});
