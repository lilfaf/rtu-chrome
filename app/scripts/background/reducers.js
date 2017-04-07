import { combineReducers } from 'redux';

const streamURL = 'http://srv2.streaming-ingenierie.fr:8184/;stream/1'

const initialPlayerState = {
  volume: 1,
  icon: 'play_arrow',
};

const initialTrackState = {};

function player(state = initialPlayerState, action = {}) {
  let audio = document.getElementById('audio-player');
  switch (action.type) {
    case 'PLAY':
      if(!audio.src) { audio.src = streamURL }
      audio.play();
      return { icon: 'pause' };
    case 'PAUSE':
      audio.pause();
      return { icon: 'play_arrow' };
    case 'TOGGLE_PLAYBACK':
      let actionType = audio.paused ? 'PLAY' : 'PAUSE';
      return player(state, { type: actionType });
    case 'RESET':
      let src = audio.src;
      audio.src = '';
      audio.load();
      audio.src = src;
      audio.load();
      return player(state, { type: 'PLAY' });
    case 'SET_VOLUME':
      return Object.assign({}, state, {
        volume: action.value
      });
    default:
      return state;
  }
}

function track(state = initialTrackState, action) {
  switch (action.type) {
    case 'SET_TRACK':
      return action.data;
    default:
      return state;
  }
}

export default combineReducers({
  player,
  track
});
