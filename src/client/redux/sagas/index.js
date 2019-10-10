import { all } from "redux-saga/effects";
import authSagas from "./front/auth.saga";
import alertSagas from "./front/alert.saga";

export default function* rootSaga(getState) {
  yield all([authSagas(), alertSagas()]);
}
