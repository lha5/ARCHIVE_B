const initialState = {
  isSigningIn: false,
  isAuth: false,
  isLoggingOut: false,
  id: '',
  name: '',
  role: 0,
};

export const signinRequestAction = (data) => {
  return {
    type: 'SIGN_IN_REQUEST',
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: 'LOG_OUT_REQUEST',
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN_REQUEST':
      return {
        ...state,
        isSigningIn: true,
        isAuth: false,
      };
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        isSigningIn: false,
        isAuth: true,
      };
    case 'SIGN_IN_FAILURE':
      return {
        ...state,
        isSigningIn: false,
        isAuth: false,
      };
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        isLoggingOut: true,
        isAuth: false,
      };
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        isLoggingOut: false,
        isAuth: false,
      };
    case 'LOG_OUT_FAILURE':
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
