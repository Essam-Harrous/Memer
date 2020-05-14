export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_MEME':
      return [action.payload, ...state];
    case 'FETCH_MEMES':
      return action.payload;
    case 'ADD_LIKE':
      return state.map((meme) => {
        if (meme.id === action.payload.memeId) {
          return {
            ...meme,
            peopleLikes: [...meme.peopleLikes, action.payload.userId],
          };
        }
        return meme;
      });
    case 'REMOVE_LIKE':
      return state.map((meme) => {
        if (meme.id === action.payload.memeId) {
          return {
            ...meme,
            peopleLikes: meme.peopleLikes.filter(
              (peopleId) => peopleId != action.payload.userId
            ),
          };
        }
        return meme;
      });
    case 'ADD_DIS_LIKE':
      return state.map((meme) => {
        if (meme.id === action.payload.memeId) {
          return {
            ...meme,
            peopleDisLikes: [...meme.peopleDisLikes, action.payload.userId],
          };
        }
        return meme;
      });
    case 'REMOVE_DIS_LIKE':
      return state.map((meme) => {
        if (meme.id === action.payload.memeId) {
          return {
            ...meme,
            peopleDisLikes: meme.peopleLikes.filter(
              (peopleId) => peopleId != action.payload.userId
            ),
          };
        }
        return meme;
      });
    default:
      return state;
  }
};
