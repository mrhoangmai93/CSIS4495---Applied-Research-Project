import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  fork,
  select
} from "redux-saga/effects";
import * as IMAGE_ACTION from "../../actions/image.action";

import lib from "../../libs/image.lib";

/**
 * Upload Image
 */
function* uploadImage(data) {
  try {
    // console.log(data.file);
    const res = yield call(lib.uploadImage, data.file);

    yield put({ type: IMAGE_ACTION.UPLOADED, payload: res.data });
  } catch (err) {
    yield put({ type: IMAGE_ACTION.UPLOAD_ERROR });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(IMAGE_ACTION.UPLOAD, uploadImage)]);
}
