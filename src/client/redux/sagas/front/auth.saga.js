import { all, takeEvery, put, call, fork, select } from "redux-saga/effects";
import * as Action from "../../actions/action.types";

function* getTest() {
  console.log("test");
}

export default function* rootSaga() {
  yield all([takeEvery(Action.GET_TEST, getTest)]);
}
