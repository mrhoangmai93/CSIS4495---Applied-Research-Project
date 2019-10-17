import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import * as ORDER_ACTION from "../../actions/order.action";
import * as ALERT_ACTION from "../../actions/alert.action";

import lib from "../../libs/order.lib";

/**
 * Load Orders
 */
function* loadOrders() {
  try {
    const res = yield call(lib.loadOrders);

    yield put({ type: ORDER_ACTION.LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: ORDER_ACTION.LOAD_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(ORDER_ACTION.LOAD, loadOrders)]);
}
