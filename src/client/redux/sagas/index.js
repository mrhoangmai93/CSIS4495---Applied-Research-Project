import { all } from "redux-saga/effects";
import authSagas from "./front/auth.saga";
import alertSagas from "./front/alert.saga";
import foodSagas from "./front/food.saga";
import cartSagas from "./front/cart.saga";

export default function* rootSaga(getState) {
  yield all([authSagas(), alertSagas(), foodSagas(), cartSagas()]);
}
