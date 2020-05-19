const INITIAL_VALUE = {
  lastMemes: [],
  myMemes: [],
  bestMemes: [],
  customMemes: [],
};

export default (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case 'ADD_MEME':
      return {
        ...state,
        lastMemes: [action.payload, ...state],
        myMemes: [action.payload, ...state],
      };
    case 'FETCH_LAST_MEMES':
      return {
        ...state,
        lastMemes: action.payload,
      };
    case 'FETCH_BEST_MEMES':
      return {
        ...state,
        bestMemes: action.payload,
      };
    case 'FETCH_MY_MEMES':
      return {
        ...state,
        myMemes: action.payload,
      };
    case 'FETCH_CUSTOM_MEMES':
      return {
        ...state,
        customMemes: action.payload,
      };
    case 'ADD_LIKE':
      return {
        ...state,
        lastMemes: state.lastMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleLikes: [...meme.peopleLikes, action.payload.userId],
            };
          }
          return meme;
        }),
        bestMemes: state.bestMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleLikes: [...meme.peopleLikes, action.payload.userId],
            };
          }
          return meme;
        }),
        myMemes: state.myMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleLikes: [...meme.peopleLikes, action.payload.userId],
            };
          }
          return meme;
        }),
        customMemes: state.customMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleLikes: [...meme.peopleLikes, action.payload.userId],
            };
          }
          return meme;
        }),
      };
    case 'REMOVE_LIKE':
      return {
        ...state,
        lastMemes: state.lastMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleLikes: meme.peopleLikes.filter(
                (peopleId) => peopleId != action.payload.userId
              ),
            };
          }
          return meme;
        }),
        bestMemes: state.bestMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleLikes: meme.peopleLikes.filter(
                (peopleId) => peopleId != action.payload.userId
              ),
            };
          }
          return meme;
        }),
        myMemes: state.myMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleLikes: meme.peopleLikes.filter(
                (peopleId) => peopleId != action.payload.userId
              ),
            };
          }
          return meme;
        }),
        cutomMemes: state.cutomMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleLikes: meme.peopleLikes.filter(
                (peopleId) => peopleId != action.payload.userId
              ),
            };
          }
          return meme;
        }),
      };
    case 'ADD_DIS_LIKE':
      return {
        ...state,
        lastMemes: state.lastMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleDisLikes: [...meme.peopleDisLikes, action.payload.userId],
            };
          }
          return meme;
        }),
        bestMemes: state.bestMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleDisLikes: [...meme.peopleDisLikes, action.payload.userId],
            };
          }
          return meme;
        }),
        myMemes: state.myMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleDisLikes: [...meme.peopleDisLikes, action.payload.userId],
            };
          }
          return meme;
        }),
        customMemes: state.customMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleDisLikes: [...meme.peopleDisLikes, action.payload.userId],
            };
          }
          return meme;
        }),
      };
    case 'REMOVE_DIS_LIKE':
      return {
        ...state,
        lastMemes: state.lastMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleDisLikes: meme.peopleLikes.filter(
                (peopleId) => peopleId != action.payload.userId
              ),
            };
          }
          return meme;
        }),
        bestMemes: state.bestMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleDisLikes: meme.peopleLikes.filter(
                (peopleId) => peopleId != action.payload.userId
              ),
            };
          }
          return meme;
        }),
        myMemes: state.myMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleDisLikes: meme.peopleLikes.filter(
                (peopleId) => peopleId != action.payload.userId
              ),
            };
          }
          return meme;
        }),
        customMemes: state.customMemes.map((meme) => {
          if (meme.id === action.payload.memeId) {
            return {
              ...meme,
              peopleDisLikes: meme.peopleLikes.filter(
                (peopleId) => peopleId != action.payload.userId
              ),
            };
          }
          return meme;
        }),
      };
    default:
      return state;
  }
};
