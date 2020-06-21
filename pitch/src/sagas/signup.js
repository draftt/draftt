import { takeLatest, put, call } from 'redux-saga/effects';
import pavilion from 'src/api';
import { SIGN_UP_USER, SET_USER_INFO } from 'src/actions';

function* signUpHelper(action) {
  const callbacks = action.meta;
  const userInfo = action.data;
  try {
    const { data } = yield call(pavilion.post, '/user/create/', userInfo);
    yield put({ type: SET_USER_INFO, data });
    callbacks.success(userInfo);
  } catch (error) {
    callbacks.failure(error);
  }
}

export default function* signUp() {
  yield takeLatest(SIGN_UP_USER, signUpHelper);
}
