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
import orderLib from "../../libs/order.lib";

/**
 * Load Profile
 */
function* loadProfile(data) {
  try {
    const res = yield call(lib.loadProfile, data.payload);

    yield put({ type: SELLER_PROFILE_ACTION.LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: SELLER_PROFILE_ACTION.LOAD_ERROR });
    const error = yield err.response.data;
    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}

/**
 * Load Seller food
 * @param {sellerId} data
 */
function* loadSellerFood(data) {
  let res;
  try {
    res = yield call(lib.loadSellerFood, data.payload);

    yield put({ type: SELLER_PROFILE_ACTION.FOOD_LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: SELLER_PROFILE_ACTION.LOAD_ERROR });
    const error = yield err.response.data;
    yield put(ALERT_ACTION.setAlert({ msg: error.msg, alertType: "danger" }));
  }
}
/**
 * Create / update a food
 * @param {*} data new food Data
 */
function* createFood(data) {
  let res;
  try {
    res = yield call(lib.createFood, data.payload);

    yield put({ type: SELLER_PROFILE_ACTION.CREATED_FOOD, payload: res.data });
    yield data.history.push({
      pathname: "/dashboard",
      activeTab: "inventory"
    });
    yield put(
      ALERT_ACTION.setAlert({
        msg: "You have successfully update food",
        alertType: "success"
      })
    );
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
function* updateFood(data) {
  let res;
  try {
    res = yield call(lib.createFood, data.payload);

    yield put({ type: SELLER_PROFILE_ACTION.UPDATED_FOOD, payload: res.data });

    yield put(
      ALERT_ACTION.setAlert({
        msg: "You have successfully update food",
        alertType: "success"
      })
    );
  } catch (err) {
    yield put({ type: SELLER_PROFILE_ACTION.UPDATE_FOOD_ERROR });
    const errors = yield err.response.data.errors;
    for (let i in errors) {
      yield put(
        ALERT_ACTION.setAlert({ msg: errors[i].msg, alertType: "danger" })
      );
    }
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
 * ADD Feedback
 * @param {*} data
 */
function* addFeedback(data) {
  try {
    const res = yield call(lib.addFeedback, data.payload);

    yield put({
      type: SELLER_PROFILE_ACTION.ADDED_FEEDBACK,
      payload: res.data
    });
    yield put(
      ALERT_ACTION.setAlert({
        msg: "You have Successful Leave a Feedback",
        alertType: "success"
      })
    );
  } catch (err) {
    yield put({ type: SELLER_PROFILE_ACTION.ADD_FEEDBACK_ERROR });
    const errors = yield err.response.data.errors;
    for (let i in errors) {
      yield put(
        ALERT_ACTION.setAlert({ msg: errors[i].msg, alertType: "danger" })
      );
    }
  }
}
/**
 * Delete feedback
 * @param {*} data
 */
function* deleteFeedback(data) {
  try {
    const res = yield call(lib.deleteFeedback, data.payload);

    yield put({
      type: SELLER_PROFILE_ACTION.DELETED_FEEDBACK,
      payload: res.data
    });
    yield put(
      ALERT_ACTION.setAlert({
        msg: "Success delete feedback",
        alertType: "success"
      })
    );
  } catch (err) {
    yield put({ type: SELLER_PROFILE_ACTION.DELETE_FEEDBACK_ERROR });
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
    takeLatest(SELLER_PROFILE_ACTION.CREATE, createSellerProfile),
    takeLatest(SELLER_PROFILE_ACTION.FOOD_LOAD, loadSellerFood),
    takeLatest(SELLER_PROFILE_ACTION.LOAD, loadProfile),
    takeLatest(SELLER_PROFILE_ACTION.ADD_FEEDBACK, addFeedback),
    takeEvery(SELLER_PROFILE_ACTION.DELETE_FEEDBACK, deleteFeedback),
    takeEvery(SELLER_PROFILE_ACTION.CREATE_FOOD, createFood),
    takeEvery(SELLER_PROFILE_ACTION.UPDATE_FOOD, updateFood)
  ]);
}
