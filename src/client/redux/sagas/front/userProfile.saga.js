import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import * as USER_PROFILE_ACTION from "../../actions/userProfile.action";
import * as ALERT_ACTION from "../../actions/alert.action";

import lib from "../../libs/userProfile.lib";

/**
 * Load Profile
 */
function* loadProfile() {
  try {
    const res = yield call(lib.loadProfile);

    yield put({ type: USER_PROFILE_ACTION.LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: USER_PROFILE_ACTION.LOAD_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
/**
 * Edit user Address
 */
function* editAddress(data) {
  try {
    const res = yield call(lib.editAddress, data.payload);

    yield put({ type: USER_PROFILE_ACTION.EDITED_ADDRESS, payload: res.data });
    if (data.history) {
      yield data.history.push("/account");
    }
  } catch (err) {
    yield put({ type: USER_PROFILE_ACTION.EDIT_ADDRESS_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
/**
 * Edit user Address
 */
function* editPayment(data) {
  try {
    const res = yield call(lib.editPayment, data.payload);

    yield put({ type: USER_PROFILE_ACTION.EDITED_PAYMENT, payload: res.data });
    yield data.history.push("/account");
  } catch (err) {
    yield put({ type: USER_PROFILE_ACTION.EDIT_PAYMENT_ERROR });
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

    yield put({ type: USER_PROFILE_ACTION.DELETED_PAYMENT, payload: res.data });
  } catch (err) {
    yield put({ type: USER_PROFILE_ACTION.DELETE_PAYMENT_ERROR });
    const error = yield err.response.data;

    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(USER_PROFILE_ACTION.LOAD, loadProfile),
    takeLatest(USER_PROFILE_ACTION.EDIT_ADDRESS, editAddress),
    takeLatest(USER_PROFILE_ACTION.EDIT_PAYMENT, editPayment),
    takeEvery(USER_PROFILE_ACTION.DELETE_PAYMENT, deletePayment)
  ]);
}
