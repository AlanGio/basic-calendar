import {
  ADD_REMINDER,
  REMOVE_REMINDER,
  EDIT_REMINDER,
} from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_REMINDER:
      const reminder = action.payload;
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 10000),
          ...reminder,
        },
      ];
    case REMOVE_REMINDER:
      const deleteReminder = action.payload;
      return state.filter((reminder) => {
        return reminder.id !== deleteReminder.id;
      });

    case EDIT_REMINDER:
      const editedReminder = action.payload;
      const newState = state.filter((reminder) => reminder.id !== editedReminder.id);
      return [
        ...newState,
        editedReminder,
      ];
    default:
      return state;
  }
};
