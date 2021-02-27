import {
  GET_FLIRTS_REQUEST,
  GET_FLIRTS_SUCCESS,
  GET_FLIRTS_FAILED,
} from '../actions/types';

const initialState = {
  flirtsLoading: false,
  proFlirtsLoading: false,
  flirtsList: [],
  proFlirtsList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FLIRTS_REQUEST:
      return {
        ...state,
        flirtsLoading: true,
      };

    case GET_FLIRTS_SUCCESS:
      return {
        ...state,
        flirtsLoading: false,
        flirtsList: action.payload,
        proFlirtsList: action.payload
      };

    case GET_FLIRTS_FAILED:
      return {
        ...state,
        flirtsLoading: false,
      };

    default:
      return state;
  }
}
