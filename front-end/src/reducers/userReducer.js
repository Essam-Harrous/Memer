const INITIAL_VALUE = {
  firstName: '',
  lastName: '',
  username: '',
};

export default (state = INITIAL_VALUE, action) => {
  if (action.type == 'SIGN_SUCCESS') {
    // return action.payload;
  } else if (action.type == 'SIGN_UP_FAILED') {
    let errMessage = {};
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
