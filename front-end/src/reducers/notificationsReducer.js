export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_NOTIFICATIONS':
      return {
        notifications: action.payload,
      };
    default:
      return state;
  }
};
