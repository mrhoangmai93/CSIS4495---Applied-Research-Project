import axios from "axios";

import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import * as ACTION from "../../actions/action.types";

function* loadUser() {
  try {
    const res = axios.get("/api/auth");

    yield put({ type: ACTION.USER_LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: ACTION.AUTH_ERROR });
  }
}
function* actionWatcher() {
  yield takeLatest(ACTION.USER_LOADED, loadUser);
}
export default function* rootSaga() {
  yield all([actionWatcher()]);
}
