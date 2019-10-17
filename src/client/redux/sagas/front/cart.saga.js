import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import * as CART_ACTION from "../../actions/cart.action";
import * as ALERT_ACTION from "../../actions/alert.action";

import lib from "../../libs/cart.lib";

/**
 * Load Cart
 */
function* loadCart() {
  try {
    const res = yield call(lib.loadCart);

    yield put({ type: CART_ACTION.LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: CART_ACTION.LOAD_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
/**
 * Clear Cart
 */
function* clearCart() {
  try {
    const res = yield call(lib.clearCart);

    yield put({ type: CART_ACTION.CLEARED, payload: res.data });
  } catch (err) {
    yield put({ type: CART_ACTION.LOAD_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
/**
 *
 * @param {foodId, quantity} data
 */
function* addToCart(data) {
  try {
    const res = yield call(lib.addToCart, data.payload);

    yield put({ type: CART_ACTION.ADDED, payload: res.data });
  } catch (err) {
    yield put({ type: CART_ACTION.ADD_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}

/**
 *  Delete from Cart
 * @param {item ID} data
 */
function* deleteFromCart(data) {
  try {
    const res = yield call(lib.deleteFromCart, data.payload);

    yield put({ type: CART_ACTION.DELETED_ITEM, payload: res.data });
  } catch (err) {
    yield put({ type: CART_ACTION.DELETE_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
/**
 *  Update Cart
 *
 * @param {foodId, quantity} data
 */
function* updateCart(data) {
  // console.log(data);
  try {
    const res = yield call(lib.updateCart, data.payload);

    yield put({ type: CART_ACTION.UPDATED, payload: res.data });
  } catch (err) {
    yield put({ type: CART_ACTION.UPDATE_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(CART_ACTION.LOAD, loadCart),
    takeEvery(CART_ACTION.ADD, addToCart),
    takeEvery(CART_ACTION.DELETE_ITEM, deleteFromCart),
    takeEvery(CART_ACTION.UPDATE, updateCart),
    takeLatest(CART_ACTION.CLEAR, clearCart)
  ]);
}
