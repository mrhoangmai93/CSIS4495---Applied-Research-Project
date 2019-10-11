import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import * as FOOD_ACTION from "../../actions/food.action";

import lib from "../../libs/food.lib";

/**
 * Load Food
 */
function* loadFoods() {
  try {
    const res = yield call(lib.loadFoods);

    yield put({ type: FOOD_ACTION.LOADED_ALL, payload: res.data });
  } catch (err) {
    yield put({ type: FOOD_ACTION.LOAD_ERROR });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(FOOD_ACTION.LOAD_ALL, loadFoods)]);
}
