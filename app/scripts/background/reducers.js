import {combineReducers} from 'redux';

import Metadata from './metadata'

const initialPlayerState = {
  volume: 1.0,
  icon: 'play_arrow'
};

const initialTrackState = {};

const initialCoverState = {
  preloaded: false
};

function player(state = initialPlayerState, action = {}) {
  let audio = document.getElementById('audio-player');
  switch (action.type) {
    case 'PLAY':
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
      audio.volume = action.value;
      state.volume = action.value;
      return state;
    default:
      return state;
  }
}

function track(state = initialTrackState, action) {
  switch (action.type) {
    case 'TRACK_INFO':
      if (state.title != action.data.title) {
        let meta = new Metadata();
        meta.fetch(action.data, (data) => {
          return Object.assign(action.data, data);
        });
      } else {
        return state;
      }
      return action.data;
    default:
      return state;
  }
}

function cover(state = initialCoverState, action) {
  switch (action.type) {
    case 'PRELOADED':
      return { preloaded: true }
    default:
      return state;
  }
}

export default combineReducers({
  player,
  track,
  cover
});
