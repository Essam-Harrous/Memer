const INITIAL_STATE = {
  memeUrl: null,
};

export default (state = INITIAL_STATE, action) => {
  if (action.type == 'SAVE_MEME') {
    return action.payload;
  }
  return state;
};
