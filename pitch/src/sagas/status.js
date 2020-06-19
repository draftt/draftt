import { takeLatest, put, call } from 'redux-saga/effects';
import pavilion from 'src/api';
import { setStatus, FETCH_STATUS } from 'src/actions';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default function* fetchStatus() {
  yield takeLatest(FETCH_STATUS, function* fetch() {
    try {
      yield delay(1000);
      const response = yield call(pavilion.get, '/status', { timeout: 1000 });
      yield put(setStatus(response.data));
    } catch (e) {
      yield put(setStatus('error'));
    }
  });
}
