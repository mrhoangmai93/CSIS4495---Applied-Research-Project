import { combineReducers } from "redux";
import alert from "./libs/alert.reducer";
import auth from "./front/auth.reducer";
import foods from "./front/food.reducer";
import cart from "./front/cart.reducer";
import userProfile from "./front/userProfile.reducer";
import currentOrder from "./front/currentOrder.reducer";
import orders from "./front/order.reducer";

export default combineReducers({
  alert,
  auth,
  foods,
  cart,
  userProfile,
  currentOrder,
  orders
});
