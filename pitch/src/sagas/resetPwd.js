import { takeLatest, call } from 'redux-saga/effects';
import pavilion from 'src/api';
import { RESET_PWD } from 'src/actions';

function* ResetPwdHelper(action) {
  const { meta } = action;
  const userData = action.data;

  console.log('ResetPwdHelper Saga called');

  const params = new FormData(); // .set() does not work, use .append()
  params.append('email', userData.email);

  try {
    const response = yield call(pavilion.get, '/user/reset_pwd/', params);
    // set in redux store
    console.log(response);
    // meta.success();
  } catch (error) {
    // meta.failure();
  }
}

export default function* resetPwd() {
  yield takeLatest(RESET_PWD, ResetPwdHelper);
}
