import { all } from "redux-saga/effects";
import testSagas from "./front/test.saga";
import authSagas from "./front/auth.saga";
import alertSagas from "./front/alert.saga";

export default function* rootSaga(getState) {
  yield all([testSagas, authSagas, alertSagas]);
}
