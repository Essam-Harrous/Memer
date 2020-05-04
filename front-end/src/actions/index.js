export const saveMeme = (memeUrl) => {
  return { payload: memeUrl, type: 'SAVE_MEME' };
};

export const addMeme = (memeData) => async (dispatch) => {};
