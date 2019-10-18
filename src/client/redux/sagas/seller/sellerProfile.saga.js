import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import * as SELLER_PROFILE_ACTION from "../../actions/seller/sellerProfile.action";
import * as ALERT_ACTION from "../../actions/alert.action";

import lib from "../../libs/seller/sellerProfile.lib";

/**
 * Load Profile
 */
function* loadProfile() {
  try {
    const res = yield call(lib.loadProfile);

    yield put({ type: SELLER_PROFILE_ACTION.LOADED, payload: res.data });
  } catch (err) {
    // yield put({ type: SELLER_PROFILE_ACTION.LOAD_ERROR });
    // const error = yield err.response.data;
    // yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
/**
 * Create seller profile
 * @param {*} data
 */
function* createSellerProfile(data) {
  try {
    const res = yield call(lib.createSellerProfile, data.payload);

    yield put({ type: SELLER_PROFILE_ACTION.CREATED, payload: res.data });
    yield data.history.push("/");
  } catch (err) {
    yield put({ type: SELLER_PROFILE_ACTION.CREATE_ERROR });
    const errors = yield err.response.data.errors;
    for (let i in errors) {
      yield put(
        ALERT_ACTION.setAlert({ msg: errors[i].msg, alertType: "danger" })
      );
    }
  }
}
/**
 * Edit user Address
 */
function* editPayment(data) {
  try {
    const res = yield call(lib.editPayment, data.payload);

    yield put({
      type: SELLER_PROFILE_ACTION.EDITED_PAYMENT,
      payload: res.data
    });
    yield data.history.push("/account");
  } catch (err) {
    yield put({ type: SELLER_PROFILE_ACTION.EDIT_PAYMENT_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
/**
 * Delete a Payment
 * @param {paymentId} data
 */
function* deletePayment(data) {
  try {
    const res = yield call(lib.deletePayment, data.payload);

    yield put({
      type: SELLER_PROFILE_ACTION.DELETED_PAYMENT,
      payload: res.data
    });
  } catch (err) {
    yield put({ type: SELLER_PROFILE_ACTION.DELETE_PAYMENT_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
export default function* rootSaga() {
  yield all([
    takeLatest(SELLER_PROFILE_ACTION.CREATE, createSellerProfile),
    takeLatest(SELLER_PROFILE_ACTION.LOAD, loadProfile)
  ]);
}
