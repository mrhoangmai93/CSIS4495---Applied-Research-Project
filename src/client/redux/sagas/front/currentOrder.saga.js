import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  delay,
  select
} from "redux-saga/effects";
import * as CURRENT_ORDER_ACTION from "../../actions/currentOrder.action";
import * as ALERT_ACTION from "../../actions/alert.action";

import lib from "../../libs/currentOrder.lib";
function* createOrder(data) {
  yield put({
    type: CURRENT_ORDER_ACTION.CREATED,
    payload: data.payload
  });
}
function* placeOrder(data) {
  try {
    const res = yield call(lib.placeOrder, data.payload);

    yield put({ type: CURRENT_ORDER_ACTION.PLACED, payload: res.data });
  } catch (err) {
    yield put({ type: CURRENT_ORDER_ACTION.PLACE_ERROR });
    const errors = yield err.response.data.errors;
    for (let i in errors) {
      yield put(
        ALERT_ACTION.setAlert({ msg: errors[i].msg, alertType: "danger" })
      );
    }
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(CURRENT_ORDER_ACTION.CREATE, createOrder),
    takeLatest(CURRENT_ORDER_ACTION.PLACE, placeOrder)
  ]);
}
