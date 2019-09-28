import { combineReducers } from "redux";
import test from "./front/test.reducer";
import alert from "./libs/alert.reducer";
import auth from "./front/auth.reducer";

export default combineReducers({
  test,
  alert,
  auth
});
