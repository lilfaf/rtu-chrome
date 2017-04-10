const initialTrackState = {};

export default function track(state = initialTrackState, action) {
  switch (action.type) {
    case 'SET_TRACK':
      return action.data;
    default:
      return state;
  }
}
