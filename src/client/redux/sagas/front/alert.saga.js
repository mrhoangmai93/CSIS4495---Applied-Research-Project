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

function* alert(data) {
  const { msg, alertType, timeout = 5000 } = data;
  const id = uuid.v4();

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
  const { id, timeout } = data;
  yield setTimeout(
    () => put({ type: ALERT_ACTION.ALERT_REMOVED, payload: id }),
    timeout
  );
}

export default function* rootSaga() {
  yield all([takeEvery(ALERT_ACTION.ALERT_SET, alert)]);
}
