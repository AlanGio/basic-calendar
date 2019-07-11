export function addReminder(payload) {
  return {
    type: 'ADD_REMINDER',
    payload,
  };
}
export function removeReminder(payload) {
  return {
    type: 'REMOVE_REMINDER',
    payload,
  };
}
export function editReminder(payload) {
  return {
    type: 'EDIT_REMINDER',
    payload,
  };
}