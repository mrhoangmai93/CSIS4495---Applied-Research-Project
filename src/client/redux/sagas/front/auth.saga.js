import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import * as AUTH_ACTION from "../../actions/auth.action";
import * as ALERT_ACTION from "../../actions/alert.action";

import lib from "../../libs/auth.lib";
/* function* loadUser() {
  try {
    const res = axios.get("/api/auth");

    yield put({ type: ACTION.USER_LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: ACTION.AUTH_ERROR });
  }
} */

function* registerUser(payload) {
  try {
    const res = yield call(lib.register, payload.payload);

    yield put(AUTH_ACTION.registerSuccess(res.data));
  } catch (err) {
    const errors = yield err.response.data.errors;
    yield put(AUTH_ACTION.registerFailed(errors));
  }
}
function* registerFail(data) {
  const errors = yield data.payload;

  for (let i in errors) {
    yield put(
      ALERT_ACTION.setAlert({ msg: errors[i].msg, alertType: "danger" })
    );
  }
}
// function* setAlert(data) {
//   yield put(ALERT_ACTION.setAlert(data));
// }

export default function* rootSaga() {
  yield all([
    takeLatest(AUTH_ACTION.REGISTER_USER, registerUser),
    takeEvery(AUTH_ACTION.REGISTER_FAILED, registerFail)
  ]);
}
