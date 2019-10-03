import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import * as ACTION from "../../actions/auth.action";
import lib from '../../libs/auth.lib';
/* function* loadUser() {
  try {
    const res = axios.get("/api/auth");

    yield put({ type: ACTION.USER_LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: ACTION.AUTH_ERROR });
  }
} */

function* registerUser(payload) {

  try {
    const res = yield call(lib.register, payload);

    yield put(ACTION.registerSuccess(res));
  } catch (err) {
    yield put(ACTION.registerFailed());
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(ACTION.REGISTER_USER, registerUser),
  ]);
}
