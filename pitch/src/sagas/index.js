import { fork, all } from 'redux-saga/effects';
import fetchStatus from './status';
import signup from './signup';
import verifyUser from './verify';
import loginUser from './login';
import resetPwd from './resetPwd';

export default function* rootSaga() {
  yield all([
    fork(fetchStatus),
    fork(signup),
    fork(verifyUser),
    fork(loginUser),
    fork(resetPwd),
  ]);
}
