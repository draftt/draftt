import { takeLatest, put, call } from 'redux-saga/effects';
import pavilion from 'src/api';
import { setAuthToken, LOGIN_USER } from 'src/actions';
import { setAuthStatus } from 'src/actions';

const SIMPLE_EMAIL_REGEX = /\S+@\S+\.\S+/;

function* loginUserHelper(action) {
  const { meta } = action;
  const userData = action.data;

  const params = new FormData(); // .set() does not work, use .append()
  params.append('grant_type', 'password');
  params.append('password', userData.password);
  params.append('client_id', 'T001');
  params.append('client_secret', 'R2D2');

  // determine if we have an email or a username
  const isEmailLogin = SIMPLE_EMAIL_REGEX.test(userData.user);

  if (isEmailLogin) {
    params.append('grant_sub_type', 'email');
    params.append('email', userData.user);
  } else {
    params.append('grant_sub_type', 'username');
    params.append('username', userData.user);
  }

  try {
    const response = yield call(pavilion.post, '/auth/token/', params);
    if (isEmailLogin) response.data.email = userData.user;
    else response.data.username = userData.user;
    // set in redux store
    yield put(setAuthToken(response.data));
    meta.success();
    yield put(setAuthStatus(true));
  } catch (error) {
    meta.failure();
  }
}

export default function* loginUser() {
  yield takeLatest(LOGIN_USER, loginUserHelper);
}
