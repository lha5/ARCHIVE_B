import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  user: {
    isAuth: false,
    name: '',
    role: 0,
  },
  post: {
    posts: [],
  },
};

// async action creator

// action creator
export const signInAction = (data) => {
  return {
    type: 'SIGN_IN',
    data,
  };
};

export const logoutAction = () => {
  return {
    type: 'LOG_OUT',
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case 'SIGN_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isAuth: true,
        },
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          ...initialState.user,
          isAuth: false,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
