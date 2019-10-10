import { combineReducers } from "redux";
import alert from "./libs/alert.reducer";
import auth from "./front/auth.reducer";

export default combineReducers({
  alert,
  auth
});
