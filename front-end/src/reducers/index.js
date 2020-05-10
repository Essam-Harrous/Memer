import { combineReducers } from 'redux';
import saveMemeReducer from './saveMemeReducer';
import userReducer from './userReducer';
import templatesReducer from './templatesReducer';
import memesReducer from './memesReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  saveMeme: saveMemeReducer,
  user: userReducer,
  templates: templatesReducer,
  memes: memesReducer,
  err: errorReducer,
});
