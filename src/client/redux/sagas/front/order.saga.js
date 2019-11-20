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
/**
 * Load all pending orders for seller
 */
function* loadPendingSellerOrders() {
  try {
    const res = yield call(lib.loadPendingSellerOrders);

    yield put({ type: ORDER_ACTION.SELLER_PENDING_LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: ORDER_ACTION.SELLER_PENDING_LOAD_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
/**
 * Load all pending orders for seller
 */
function* loadCompletedSellerOrders() {
  try {
    const res = yield call(lib.loadCompletedSellerOrders);

    yield put({ type: ORDER_ACTION.SELLER_COMPLETE_LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: ORDER_ACTION.SELLER_COMPLETE_LOAD_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
/**
 * Load all orders for seller
 */
function* loadAllSellerOrders() {
  try {
    const res = yield call(lib.loadAllSellerOrders);

    yield put({ type: ORDER_ACTION.SELLER_LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: ORDER_ACTION.SELLER_LOAD_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
/**
 * complete orders for seller
 */
function* sellerCompleteOrder(data) {
  const order = {
    orderStatus: "completed"
  };
  try {
    const res = yield call(lib.sellerEditOrder, { id: data.id, order });
    yield put({ type: ORDER_ACTION.SELLER_COMPLETED, payload: res.data });
  } catch (err) {
    yield put({ type: ORDER_ACTION.SELLER_COMPLETE_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(ORDER_ACTION.LOAD, loadOrders),
    takeLatest(ORDER_ACTION.SELLER_PENDING_LOAD, loadPendingSellerOrders),
    takeLatest(ORDER_ACTION.SELLER_COMPLETE, sellerCompleteOrder),
    takeLatest(ORDER_ACTION.SELLER_COMPLETE_LOAD, loadCompletedSellerOrders),
    takeLatest(ORDER_ACTION.SELLER_LOAD, loadAllSellerOrders)
  ]);
}
