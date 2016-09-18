import {combineReducers} from 'redux';

const initialState = {
  volume: 0.5,
  icon: 'play_arrow'
};

function player(state = initialState, action) {
  let audio = document.getElementById('audio-player');
  switch (action.type) {
    case 'PLAY':
      audio.play();
      return { icon: 'pause' };
    case 'PAUSE':
      audio.pause();
      return { icon: 'play_arrow' };
    case 'TOGGLE_PLAYBACK':
      action = audio.paused ? 'PLAY' : 'PAUSE'
      return player(state, { type: action });
    case 'RESET':
      let src = audio.src;
      audio.src = '';
      audio.load();
      audio.src = src;
      audio.load();
      return player(state, { type: 'PLAY' });
    case 'SET_VOLUME':
      audio.volume = action.value;
      state.volume = action.value;
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  player
});
