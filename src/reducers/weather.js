import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_ERROR,
} from '../constants';

const initialState = {
  error: null,
  loading: false,
  status: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER_REQUEST:
      return {
        ...state,
        status: [],
        loading: true,
      }
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        status: action.payload.weather,
        loading: false,
      };
    case GET_WEATHER_ERROR:
      return {
        ...state,
        status: [],
        loading: false,
        error: action.payload,
      };
  
    default:
      return state;
  }
};