const initialPlayerState = {
  volume: 1,
  icon: 'play_arrow',
  playing: false
};

export default function player(state = initialPlayerState, action = {}) {
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
    case 'SET_VOLUME':
      return Object.assign({}, state, {
        volume: action.value
      });
    default:
      return state;
  }
}
