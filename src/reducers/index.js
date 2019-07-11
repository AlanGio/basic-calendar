import { combineReducers } from 'redux';
import reminders from './reminders';
import weather from './weather';

export default combineReducers({
  reminders,
  weather,
});
