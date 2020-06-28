import { takeLatest, call } from 'redux-saga/effects';
import pavilion from 'src/api';
import { SET_NEW_PWD } from 'src/actions';

function* NewPwdHelper(action) {
  const { meta } = action;
  const userData = action.data;

  const params = new FormData(); // .set() does not work, use .append()
  //   params.append('email', userData.email);
  // TODO: need that token

  try {
    const response = yield call(pavilion.patch, '/user/reset_pwd/', params);
    // set in returned stuff in redux store
    console.log(response);
    // yield put({ type: SET_USER_INFO, data: response.data });
    meta.success();
  } catch (error) {
    meta.failure();
  }
}

export default function* resetPwd() {
  yield takeLatest(SET_NEW_PWD, NewPwdHelper);
}
