import { takeLatest, put, call } from 'redux-saga/effects';
import pavilion from 'src/api';
import { setStatus, SET_USER_INFO } from 'src/actions';

/*

    TODO:
        - call the signup api

*/

function* signupTest(action) {
  // TODO: recieve the onSuccess and onError functions as part of the meta property
  try {
    console.log('About to call api');
    const response = yield call(pavilion.post, '/user/create/', action.userdata);
    console.log('returned from api AND about to call the onSuccesscallback');
    action.onSuccess();
  } catch (error) {
    console.log(error.response);
    // TODO: call the onError callback here
  }
}

export default function* signup() {
  yield takeLatest(SET_USER_INFO, signupTest);
}
