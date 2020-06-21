import { takeLatest, put, call } from 'redux-saga/effects';
import pavilion from 'src/api';
import { VERIFY_USER } from 'src/actions';

function* verifyHelper(action) {
  const { data, meta } = action;
  try {
    yield call(pavilion.post, '/user/verify/', data);
    meta.success();
  } catch (error) {
    meta.failure(error.response);
  }
}

export default function* verifyUser() {
  yield takeLatest(VERIFY_USER, verifyHelper);
}
