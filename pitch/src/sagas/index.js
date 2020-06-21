import { fork, all } from 'redux-saga/effects';
import fetchStatus from './status';
import signup from './auth';

export default function* rootSaga() {
  yield all([
    fork(fetchStatus),
    fork(signup),
  ]);
}
