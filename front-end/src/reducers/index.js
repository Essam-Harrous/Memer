import { combineReducers } from 'redux';
import saveMemeReducer from './saveMemeReducer';

export default combineReducers({
  saveMeme: saveMemeReducer,
});
