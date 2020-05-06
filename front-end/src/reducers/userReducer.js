const INITIAL_VALUE = {
  firstName: null,
  lastName: null,
  username: null,
  token: null,
};

export default (state = INITIAL_VALUE, action) => {
  if (action.type == 'SIGN_SUCCESS') {
    return action.payload;
  } else if (action.type == 'SIGN_UP_FAILED') {
    if (action.payload.errMessage.includes('البريد')) {
      return {
        errMessage: {
          email: action.payload.errMessage,
        },
      };
    }
    return {
      errMessage: {
        username: action.payload.errMessage,
      },
    };
  } else if (action.type == 'LOG_IN_FAILED') {
    return action.payload;
  }
  return state;
};
