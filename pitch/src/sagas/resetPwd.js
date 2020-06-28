import { takeLatest, call, put } from 'redux-saga/effects';
import pavilion from 'src/api';
import { RESET_PWD, SET_USER_INFO } from 'src/actions';

function* ResetPwdHelper(action) {
  const { meta } = action;
  const userData = action.data;

  const params = new FormData(); // .set() does not work, use .append()
  params.append('email', userData.email);

  try {
    const response = yield call(pavilion.post, '/user/reset_pwd/', params);
    // set in returned stuff in redux store
    response.data.email = userData.email;
    yield put({ type: SET_USER_INFO, data: response.data });
    meta.success();
  } catch (error) {
    meta.failure();
  }
}

export default function* resetPwd() {
  yield takeLatest(RESET_PWD, ResetPwdHelper);
}
