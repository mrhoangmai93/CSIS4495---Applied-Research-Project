import { all } from "redux-saga/effects";
import testSagas from "./front/test.saga";
import authSagas from "./front/auth.saga";

export default function* rootSaga(getState) {
  yield all([testSagas, authSagas]);
}
