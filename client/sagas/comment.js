import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function createCommentAPI(dataToSubmit) {
  return axios.post(`${process.env.REACT_APP_COMMENT_API}`, dataToSubmit);
}

function deleteCommentByIdAPI(dataToSubmit) {
  const config = {
    data: {
      _id: dataToSubmit._id,
      password: dataToSubmit.password,
    }
  };
  return axios.delete(`${process.env.REACT_APP_COMMENT_API}`, config);
}

function* createComment(action) {
  try {
    const result = yield call(createCommentAPI, action.dataToSubmit);
    yield put({
      type: 'CREATE_COMMENT_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'CREATE_COMMENT_FAILURE',
      data: error.response.data,
    });
  }
}

function* deleteCommentById(action) {
  try {
    const result = yield call(deleteCommentByIdAPI, action.dataToSubmit);
    yield put({
      type: 'DELETE_COMMENT_SUCCESS',
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: 'DELETE_COMMENT_FAILURE',
      data: error.response.data,
    });
  }
}

function* watchCreateComment() {
  yield takeLatest('CREATE_COMMENT_REQUEST', createComment);
}

function* watchDeleteCommentById() {
  yield takeLatest('DELETE_COMMENT_REQUEST', deleteCommentById);
}

export default function* commentSaga() {
  yield all([fork(watchCreateComment), fork(watchDeleteCommentById)]);
}
