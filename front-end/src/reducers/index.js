import { combineReducers } from 'redux';
import saveMemeReducer from './saveMemeReducer';
import userReducer from './userReducer';

export default combineReducers({
  saveMeme: saveMemeReducer,
  user: userReducer,
});
