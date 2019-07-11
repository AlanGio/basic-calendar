import api from '../api';
import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_ERROR,
} from '../constants';

export const getWeather = payload => dispatch => {

  dispatch({
    type: GET_WEATHER_REQUEST,
    meta: api.weather
      .getWeather(payload)
      .then(response => {
          dispatch({
            type: GET_WEATHER_SUCCESS,
            payload: {
              ...payload,
              ...response.data,
            },
          });
        }
      )
      .catch(error =>
        dispatch({
          type: GET_WEATHER_ERROR,
          payload: error.response,
        })
      ),
  })
};