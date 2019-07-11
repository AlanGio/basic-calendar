import axios from 'axios';
const API_ID = '087a6e3f2d3bf106f5cfa83413f3f552';

export const getWeather = ({ city, dt }) =>
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=1&dt=${dt}&appid=${API_ID}`);

export default { getWeather };
