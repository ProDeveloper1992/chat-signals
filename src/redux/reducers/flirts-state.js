import {
  GET_FLIRTS_REQUEST,
  GET_FLIRTS_SUCCESS,
  GET_FLIRTS_FAILED,
  GET_SPOT_LIGHTS_REQUEST,
  GET_SPOT_LIGHTS_SUCCESS,
  GET_SPOT_LIGHTS_FAILED,
  IS_LOAD_MORE_FLIRTS
} from '../actions/types';

const initialState = {
  flirtsLoading: false,
  spotLightsLoading: false,
  flirtsList: [],
  spotLightsList: [],
  isLoadMoreFlirts: true
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
      };

    case IS_LOAD_MORE_FLIRTS:
      return {
        ...state,
        isLoadMoreFlirts: action.payload
      }

    case GET_FLIRTS_FAILED:
      return {
        ...state,
        flirtsLoading: false,
      };

    case GET_SPOT_LIGHTS_REQUEST:
      return {
        ...state,
        spotLightsLoading: true,
      };

    case GET_SPOT_LIGHTS_SUCCESS:
      return {
        ...state,
        spotLightsList: action.payload,
        spotLightsLoading: false,
      };

    case GET_SPOT_LIGHTS_FAILED:
      return {
        ...state,
        spotLightsLoading: false,
      };

    default:
      return state;
  }
}
