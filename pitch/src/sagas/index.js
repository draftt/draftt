import { fork, all } from 'redux-saga/effects'
import fetchStatus from './status'
export default function* rootSaga() {
    yield all([
      fork(fetchStatus)
    ])
  }