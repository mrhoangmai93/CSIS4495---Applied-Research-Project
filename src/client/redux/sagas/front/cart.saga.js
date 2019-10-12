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
  }
}
/**
 * Add to Cart
 */
function* addToCart(data) {
  try {
    const res = yield call(lib.addToCart, data.payload);

    yield put({ type: CART_ACTION.ADDED, payload: res.data });
  } catch (err) {
    yield put({ type: CART_ACTION.ADD_ERROR });
  }
}

/**
 * Add to Cart
 */
function* deleteFromCart(data) {
  console.log(data);
  try {
    const res = yield call(lib.deleteFromCart, data.payload);

    yield put({ type: CART_ACTION.DELETED_ITEM, payload: res.data });
  } catch (err) {
    yield put({ type: CART_ACTION.DELETE_ERROR });
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(CART_ACTION.LOAD, loadCart),
    takeEvery(CART_ACTION.ADD, addToCart),
    takeEvery(CART_ACTION.DELETE_ITEM, deleteFromCart)
  ]);
}
