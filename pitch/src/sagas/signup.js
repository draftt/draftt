import { takeLatest, put, call } from 'redux-saga/effects';
import pavilion from 'src/api';
import { SIGN_UP_USER, SET_USER_INFO } from 'src/actions';

function* signUpHelper(action) {
  const { meta } = action;
  const userInfo = action.data;
  try {
    const { data } = yield call(pavilion.post, '/user/create/', userInfo);
    yield put({ type: SET_USER_INFO, data });
    meta.success(userInfo);
  } catch (error) {
    meta.failure(error.response);
  }
}

export default function* signUp() {
  yield takeLatest(SIGN_UP_USER, signUpHelper);
}
