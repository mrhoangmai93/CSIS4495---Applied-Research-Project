import axios from "axios";

import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import * as ACTION from "../../actions/action.types";

function* loadUser() {
  try {
    const res = axios.get("/api/auth");

    yield put({ type: ACTION.USER_LOADED, payload: res.data });
  } catch (err) {
    yield put({ type: ACTION.AUTH_ERROR });
  }
}
function* loadUserWatcher() {
  yield takeLatest(ACTION.LOAD_USER, loadUser);
}

function* registerUser({ name, email, password, role = "user" }) {
  const config = {
    header: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = yield axios.post(`/api/users/register/${role}`, body, config);

    yield put(registerUserSuccess(res));
  } catch (err) {
    yield put(registerUserError());
  }
}
function* registerUserWatcher() {
  yield takeEvery(ACTION.REGISTER_USER, registerUser);
}

export default function* rootSaga() {
  yield all([loadUserWatcher()]);
}
