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
  const { msg, alertType, timeout = 5000 } = yield data.payload;
  const id = yield uuid.v4();

  yield put({
    type: ALERT_ACTION.ALERT_SET_DONE,
    payload: {
      msg,
      alertType,
      id
    }
  });

  yield setTimeout(() => {
    removeAlert(id);
    //put({ type: ALERT_ACTION.ALERT_REMOVED, payload: id });
  }, timeout);
}

function* removeAlert(data) {
  console.log("remove");
}

export default function* rootSaga() {
  yield all([
    takeEvery(ALERT_ACTION.ALERT_SET, alert)
    // takeEvery(AUTH_ACTION.REGISTER_FAILED, alert)
    //   takeEvery(ALERT_ACTION.ALERT_REMOVED, removeAlert)
  ]);
}
