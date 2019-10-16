import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import * as AUTH_ACTION from "../../actions/auth.action";
import * as ALERT_ACTION from "../../actions/alert.action";

import lib from "../../libs/auth.lib";

import setAuthToken from "../../../helpers/setAuthToken";

/**
 * Load User
 */
function* loadUser() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = yield call(lib.loadUser);

    yield put({ type: AUTH_ACTION.USER_LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: AUTH_ACTION.LOAD_ERROR });
  }
}
/**
 * Register a new user
 * @param {name, email, password} data
 */
function* registerUser(data) {
  try {
    const res = yield call(lib.register, data.payload);

    yield put(AUTH_ACTION.registerSuccess(res.data));
  } catch (err) {
    const errors = yield err.response.data.errors;
    yield put(AUTH_ACTION.registerFailed(errors));
  }
}
/**
 * This function is called when an action is failed
 * @param {*} data
 */
function* actionFail(data) {
  const errors = yield data.payload;

  for (let i in errors) {
    yield put(
      ALERT_ACTION.setAlert({ msg: errors[i].msg, alertType: "danger" })
    );
  }
}
/**
 * Login user
 * @param {email, password} data
 */
function* loginUser(data) {
  try {
    const res = yield call(lib.login, data.payload);

    yield put(AUTH_ACTION.loginSuccess(res.data));
  } catch (err) {
    const errors = yield err.response.data.errors;
    yield put(AUTH_ACTION.loginFailed(errors));
  }
}

function* changePassword(data) {
  try {
    const res = yield call(lib.changePassword, data.payload);

    yield put({ type: AUTH_ACTION.CHANGED_PASSWORD });
    yield put(
      ALERT_ACTION.setAlert({ msg: res.data.msg, alertType: "success" })
    );
  } catch (err) {
    const errors = yield err.response.data.errors;
    yield put({ type: AUTH_ACTION.CHANGE_PASSWORD_ERROR });

    for (let i in errors) {
      yield put(
        ALERT_ACTION.setAlert({ msg: errors[i].msg, alertType: "danger" })
      );
    }
    //yield put(AUTH_ACTION.loginFailed(errors));
  }
}
/**
 * Log out function
 */
function* logout() {}

export default function* rootSaga() {
  yield all([
    takeLatest(AUTH_ACTION.REGISTER_USER, registerUser),
    takeEvery(AUTH_ACTION.REGISTER_FAILED, actionFail),
    takeEvery(AUTH_ACTION.REGISTER_SUCCEEDED, loadUser),
    takeEvery(AUTH_ACTION.LOGIN_SUCCEEDED, loadUser),
    takeEvery(AUTH_ACTION.LOAD_USER, loadUser),
    takeEvery(AUTH_ACTION.LOGIN_FAILED, actionFail),
    takeLatest(AUTH_ACTION.LOGIN_USER, loginUser),
    takeLatest(AUTH_ACTION.LOGOUT_USER, logout),
    takeLatest(AUTH_ACTION.CHANGE_PASSWORD, changePassword)
  ]);
}
