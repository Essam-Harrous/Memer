const INITIAL_VALUE = [];

export default (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case 'ADD_TEMPLATE':
      return [action.payload, ...state];
    case 'GET_TEMPLATES':
      return action.payload;
    default:
      return state;
  }
};
