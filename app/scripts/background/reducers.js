import {combineReducers} from 'redux';

const initialState = 'paused';

var player = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAY':
      return 'playing';
    case 'PAUSE':
      return 'paused';
    default:
      return state;
  }
};

export default combineReducers({
  player
});
