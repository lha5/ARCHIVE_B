import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
} from '../reducers/comment';

function createCommentAPI(dataToSubmit) {
  return axios.post(`${process.env.NEXT_PUBLIC_COMMENT_API}`, dataToSubmit);
}

function deleteCommentByIdAPI(dataToSubmit) {
  const config = {
    data: {
      _id: dataToSubmit._id,
      password: dataToSubmit.password,
    }
  };
  return axios.delete(`${process.env.NEXT_PUBLIC_COMMENT_API}`, config);
}

function* createComment(action) {
  try {
    const result = yield call(createCommentAPI, action.dataToSubmit);
    yield put({
      type: CREATE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: CREATE_COMMENT_FAILURE,
      error: error.response.data,
    });
  }
}

function* deleteCommentById(action) {
  try {
    const result = yield call(deleteCommentByIdAPI, action.dataToSubmit);
    yield put({
      type: DELETE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: DELETE_COMMENT_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchCreateComment() {
  yield takeLatest(CREATE_COMMENT_REQUEST, createComment);
}

function* watchDeleteCommentById() {
  yield takeLatest(DELETE_COMMENT_REQUEST, deleteCommentById);
}

export default function* commentSaga() {
  yield all([fork(watchCreateComment), fork(watchDeleteCommentById)]);
}
