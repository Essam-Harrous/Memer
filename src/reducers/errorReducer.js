export default (state = {}, action) => {
  switch (action.type) {
    case 'ERROR':
      return action.payload;
    case 'ERROR_SIGN_UP':
      if (action.payload.signUp.includes('البريد')) {
        return {
          signUp: {
            email: action.payload.signUp,
          },
        };
      }
      return {
        signUp: {
          username: action.payload.signUp,
        },
      };
    default:
      return state;
  }
};
