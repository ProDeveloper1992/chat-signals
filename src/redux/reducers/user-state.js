import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS } from '../actions/types';

const initialState = {
  isLoggedIn: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
      };

    case LOGIN_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
}
