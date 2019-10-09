import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import uuid from "uuid";

import * as ALERT_ACTION from "../../actions/alert.action";
import * as AUTH_ACTION from "../../actions/auth.action";

function* alert(data) {
  const { msg, alertType, timeout = 5000 } = yield data;
  console.log(alertType);
  const id = yield uuid.v4();

  yield put({
    type: ALERT_ACTION.ALERT_SET_DONE,
    payload: {
      msg,
      alertType,
      id
    }
  });

  yield put(removeAlert({ id, timeout }));
}

function* removeAlert(data) {
  const { id, timeout } = yield data;
  yield setTimeout(
    () => put({ type: ALERT_ACTION.ALERT_REMOVED, payload: id }),
    timeout
  );
}

export default function* rootSaga() {
  yield all([
    takeEvery(ALERT_ACTION.ALERT_SET, alert),
    takeEvery(AUTH_ACTION.REGISTER_FAILED, alert)
  ]);
}
