import { takeLatest, put, call } from 'redux-saga/effects';
import pavilion from 'src/api';
import { SIGN_UP_USER } from 'src/actions';

function* signUpHelper(action) {
  const callbacks = action.meta;
  const userInfo = action.data;
  try {
    yield call(pavilion.post, '/user/create/', userInfo);
    // TODO: add a put call here to dispatch action to add userinfo in redux store
    console.log('SUCCESS IN SAGA API CALL');
    callbacks.success(userInfo);
  } catch (error) {
    console.log('ERROR IN SAGA API CALL');
    callbacks.failure(error);
  }
}

export default function* signUp() {
  yield takeLatest(SIGN_UP_USER, signUpHelper);
}
