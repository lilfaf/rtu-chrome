import { playStream, pauseStream } from './actions'

const changePlaybackState = () => {
  return (dispatch, getState) => {
    if (getState().player.playing) {
      dispatch(pauseStream());
    } else {
      dispatch(playStream());
    }
  };
}

export default {
  'TOGGLE_PLAYBACK': changePlaybackState
};
