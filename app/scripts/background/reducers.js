import { combineReducers } from 'redux';

const streamURL = 'http://srv2.streaming-ingenierie.fr:8184/;stream/1'

const initialPlayerState = {
  volume: 1,
  icon: 'play_arrow',
  playing: false
};

const initialTrackState = {};

function player(state = initialPlayerState, action = {}) {
  switch (action.type) {
    case 'PLAY':
      return Object.assign({}, state, {
        icon: 'pause',
        playing: true
      });
    case 'PAUSE':
      return Object.assign({}, state, {
        icon: 'play_arrow',
        playing: false
      })
    case 'TOGGLE_PLAYBACK':
      let actionType = state.playing ? 'PAUSE' : 'PLAY';
      return player(state, { type: actionType });
    case 'RESET':
      let audio = document.getElementById('audio-player');
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
