export function resetStream() {
  return {type: 'RESET'};
}

export function changeVolume(value) {
  return {type: 'SET_VOLUME', value: value};
}

export function changePlaybackState() {
  return {type: 'TOGGLE_PLAYBACK'};
}
