import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
} from '../reducers/user';

function signInAPI(dataToSubmit) {
  return axios.post(`${process.env.NEXT_PUBLIC_USER_API}/signin`, dataToSubmit);
}

function logOutAPI(id) {
  return axios.get(`${process.env.NEXT_PUBLIC_USER_API}/logout/:${id}`);
}

function* signIn(action) {
  try {
    const result = yield call(signInAPI, action.dataToSubmit);
    yield put({
      type: SIGN_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: SIGN_IN_FAILURE,
      error: error.response.data,
    });
  }
}

function* logOut(action) {
  try {
    const result = yield call(logOutAPI, action.id);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, signIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
  yield all([fork(watchSignIn), fork(watchLogOut)]);
}
