export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_MEME':
      return [action.payload, ...state];
    case 'FETCH_MEMES':
      return action.payload;
    default:
      return state;
  }
};
