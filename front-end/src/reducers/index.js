import { combineReducers } from 'redux';
import saveMemeReducer from './saveMemeReducer';
import userReducer from './userReducer';
import templatesReducer from './templatesReducer';
import memesReducer from './memesReducer';
import errorReducer from './errorReducer';
import currentMemeReducer from './currentMemeReducer';
import notificationsReducer from './notificationsReducer';

export default combineReducers({
  saveMeme: saveMemeReducer,
  user: userReducer,
  templates: templatesReducer,
  memes: memesReducer,
  currentMeme: currentMemeReducer,
  err: errorReducer,
  notify: notificationsReducer,
});
