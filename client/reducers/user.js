const initialState = {
  isAuth: false,
  name: '',
  role: 0,
};

export const signinRequestAction = (data) => {
  return {
    type: 'SIGN_IN_REQUEST',
    data,
  };
};

export const signinSuccessAction = (data) => {
  return {
    type: 'SIGN_IN_SUCCESS',
    data,
  };
};

export const signinFailureAction = (data) => {
  return {
    type: 'SIGN_IN_FAILURE',
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: 'LOG_OUT_REQUEST',
  };
};

export const logoutSuccessAction = () => {
  return {
    type: 'LOG_OUT_SUCCESS',
  };
};

export const logoutFailureAction = () => {
  return {
    type: 'LOG_OUT_FAILURE',
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isAuth: true,
      };
    case 'LOG_OUT':
      return {
        ...initialState,
        isAuth: false,
      };
    default:
      return state;
  }
};

export default reducer;
