import { all, call, fork, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
} from '../reducers/post';

function createPostAPI(dataToSubmit) {
  return axios.post(`${process.env.REACT_APP_POST_API}`, dataToSubmit);
}

function getAllPostsAPI() {
  return axios.get(`${process.env.REACT_APP_POST_API}`);
}

function deletePostByIdAPI(dataToSubmit) {
  const config = {
    data: {
      _id: dataToSubmit._id,
      password: dataToSubmit.password,
    }
  };
  return axios.delete(`${process.env.REACT_APP_POST_API}`, config);
}

function* createPost(action) {
  try {
    const result = yield call(createPostAPI, action.dataToSubmit);
    yield put({
      type: CREATE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: CREATE_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function* getAllPosts() {
  try {
    const result = yield call(getAllPostsAPI);
    yield put({
      type: GET_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: GET_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function* deletePostById(action) {
  try {
    const result = yield call(deletePostByIdAPI, action.dataToSubmit);
    yield put({
      type: DELETE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: DELETE_POST_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchCreatePost() {
  yield takeLatest(CREATE_POST_REQUEST, createPost);
}

function* watchGetAllPosts() {
  yield takeLatest(GET_POST_REQUEST, getAllPosts);
}

function* watchDeletePostById() {
  yield takeLatest(DELETE_POST_REQUEST, deletePostById);
}

export default function* postSaga() {
  yield all([fork(watchCreatePost), fork(watchGetAllPosts), fork(watchDeletePostById)]);
}
