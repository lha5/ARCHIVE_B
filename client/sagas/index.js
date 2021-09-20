import { all, call, fork, take, put } from 'redux-saga/effects';
import axios from 'axios';

function signInAPI(dataToSubmit) {
  return axios.post(`${process.env.REACT_APP_USER_API}/signin`, dataToSubmit);
}

function logOutAPI(id) {
  return axios.get(`${process.env.REACT_APP_USER_API}/logout/:${id}`);
}

function createPostAPI(dataToSubmit) {
  return axios.post(`${process.env.REACT_APP_POST_API}`, dataToSubmit);
}

function* signIn(action) {
  try {
    const result = yield call(signInAPI, action.dataToSubmit);
    yield put({
      type: 'SIGN_IN_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'SIGN_IN_FAILURE',
      data: error.response.data,
    });
  }
}

function* logOut(action) {
  try {
    const result = yield call(logOutAPI, action.id);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: error.response.data,
    });
  }
}

function* createPost(action) {
  try {
    const result = yield call(createPostAPI, action.dataToSubmit);
    yield put({
      type: 'CREATE_POST_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'CREATE_POST_FAILURE',
      data: error.response.data,
    });
  }
}

function* watchSignIn() {
  yield take('SING_IN_REQUEST', signIn);
}

function* watchLogOut() {
  yield take('LOG_OUT_REQUEST', logOut);
}

function* watchCreatePost() {
  yield take('CREATE_POST_REQUEST', createPost);
}

export default function* rootSaga() {
  yield all([
    fork(watchSignIn),
    fork(watchLogOut),
    fork(watchCreatePost),
  ]);
}
