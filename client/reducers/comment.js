const initialState = {
  comments: [],
  loadingToCreateComment: false,
  doneCreatedComment: false,
  errorToCreateComment: false,
  loadingToDeleteComment: false,
  doneDeletedComment: false,
  errorToDeleteComment: false,
};

export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        loadingToCreateComment: true,
        doneCreatedComment: false,
        errorToCreateComment: false,
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        comments: [...state.comments],
        loadingToCreateComment: false,
        doneCreatedComment: true,
        errorToCreateComment: false,
      };
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        loadingToCreateComment: false,
        doneCreatedComment: false,
        errorToCreateComment: true,
      };
    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        loadingToDeleteComment: true,
        doneDeletedComment: false,
        errorToDeleteComment: false,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        comments: [...state.comments],
        loadingToDeleteComment: false,
        doneDeletedComment: true,
        errorToDeleteComment: false,
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        loadingToDeleteComment: false,
        doneDeletedComment: false,
        errorToDeleteComment: true,
      };
    default:
      return state;
  }
};

export default reducer;
