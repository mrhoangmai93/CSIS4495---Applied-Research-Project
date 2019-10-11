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
  console.log(data);
  try {
    const res = yield call(lib.addToCart, data.payload);

    yield put({ type: CART_ACTION.ADDED, payload: res.data });
  } catch (err) {
    yield put({ type: CART_ACTION.ADD_ERROR });
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(CART_ACTION.LOAD, loadCart),
    takeEvery(CART_ACTION.ADD, addToCart)
  ]);
}
