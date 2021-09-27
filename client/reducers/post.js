const initialState = {
  posts: [],
  loadingToCreatePost: false,
  doneCreatedPost: false,
  errorToCreatePost: false,
  loadingToGetPosts: false,
  doneGottenPosts: false,
  errorToGetPosts: false,
  loadingToDeletePost: false,
  doneDeletedPost: false,
  errorToDeletePost: false,
};

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const GET_POST_REQUEST = 'GET_POST_REQUEST';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'GET_POST_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return {
        ...state,
        loadingToCreatePost: true,
        doneCreatedPost: false,
        errorToCreatePost: false,
      };
    case CREATE_POST_SUCCESS:
      return {
        posts: [...state.posts],
        loadingToCreatePost: false,
        doneCreatedPost: true,
        errorToCreatePost: false,
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        loadingToCreatePost: false,
        doneCreatedPost: false,
        errorToCreatePost: true,
      };
    case GET_POST_REQUEST:
      return {
        ...state,
        loadingToGetPosts: true,
        doneGottenPosts: false,
        errorToGetPosts: false,
      };
    case DELETE_POST_SUCCESS:
      return {
        posts: [...state.posts],
        loadingToDeletePost: false,
        doneDeletedPost: true,
        errorToDeletePost: false,
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        loadingToDeletePost: false,
        doneDeletedPost: false,
        errorToDeletePost: true,
      };
    case DELETE_POST_REQUEST:
      return {
        ...state,
        loadingToDeletePost: true,
        doneDeletedPost: false,
        errorToDeletePost: false,
      };
    case GET_POST_SUCCESS:
      return {
        posts: [...state.posts],
        loadingToGetPosts: false,
        doneGottenPosts: true,
        errorToGetPosts: false,
      };
    case GET_POST_FAILURE:
      return {
        ...state,
        loadingToGetPosts: false,
        doneGottenPosts: false,
        errorToGetPosts: true,
      };
    default:
      return state;
  }
};

export default reducer;
