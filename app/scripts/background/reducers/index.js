import { combineReducers } from 'redux';
import player from './player';
import track from './track';

export default combineReducers({
  player,
  track
});
