import { takeLatest, call } from 'redux-saga/effects';
import pavilion from 'src/api';
import { SET_NEW_PWD } from 'src/actions';

function* NewPwdHelper(action) {
  const { meta } = action;
  const userData = action.data;

  const params = new FormData(); // .set() does not work, use .append()
  params.append('uid', userData.uid);
  params.append('token', userData.token);
  params.append('password', userData.password);

  console.log(params);

  try {
    const response = yield call(pavilion.patch, '/user/reset_pwd/', params);
    console.log('SUCCESS');
    console.log(response);
    // meta.success();
  } catch (error) {
    console.log('ERROR CASE IN SAGA');
    console.log(error);
    // meta.failure();
  }
}

export default function* resetPwd() {
  yield takeLatest(SET_NEW_PWD, NewPwdHelper);
}
