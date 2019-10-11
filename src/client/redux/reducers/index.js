import { combineReducers } from "redux";
import alert from "./libs/alert.reducer";
import auth from "./front/auth.reducer";
import foods from "./front/food.reducer";

export default combineReducers({
  alert,
  auth,
  foods
});
