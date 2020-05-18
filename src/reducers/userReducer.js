const INITIAL_VALUE = {
  id: null,
  firstName: null,
  lastName: null,
  username: null,
  token: null,
  avatar: null,
};

export default (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case 'SIGN_SUCCESS':
      return action.payload;
    case 'LOG_OUT':
      return action.payload;
    default:
      return state;
  }
};
