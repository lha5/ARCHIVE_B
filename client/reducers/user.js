const initialState = {
  isSigningIn: false,
  isAuth: false,
  isLoggingOut: false,
  id: '',
  name: '',
  role: 0,
};

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const signinRequestAction = (data) => {
  return {
    type: SIGN_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        isSigningIn: true,
        isAuth: false,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isSigningIn: false,
        isAuth: true,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        isSigningIn: false,
        isAuth: false,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        isAuth: false,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuth: false,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        isAuth: false,
      };
    default:
      return state;
  }
};

export default reducer;
