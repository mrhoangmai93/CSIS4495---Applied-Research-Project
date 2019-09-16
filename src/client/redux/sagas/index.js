import { all } from 'redux-saga/effects';
import testSagas from './front/test.saga';
export default function* rootSaga(getState) {
    yield all([testSagas]);
}