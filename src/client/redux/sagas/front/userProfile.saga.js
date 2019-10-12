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
  }
}
//   /**
//    * Add to Cart
//    */
//   function* addToCart(data) {
//     try {
//       const res = yield call(lib.addToCart, data.payload);

//       yield put({ type: USER_PROFILE_ACTION.ADDED, payload: res.data });
//     } catch (err) {
//       yield put({ type: USER_PROFILE_ACTION.ADD_ERROR });
//     }
//   }

//   /**
//    * Add to Cart
//    */
//   function* deleteFromCart(data) {
//     console.log(data);
//     try {
//       const res = yield call(lib.deleteFromCart, data.payload);

//       yield put({ type: USER_PROFILE_ACTION.DELETED_ITEM, payload: res.data });
//     } catch (err) {
//       yield put({ type: USER_PROFILE_ACTION.DELETE_ERROR });
//     }
//   }
export default function* rootSaga() {
  yield all([
    takeEvery(USER_PROFILE_ACTION.LOAD, loadProfile)
    //   takeEvery(USER_PROFILE_ACTION.ADD, addToCart),
    //   takeEvery(USER_PROFILE_ACTION.DELETE_ITEM, deleteFromCart)
  ]);
}
