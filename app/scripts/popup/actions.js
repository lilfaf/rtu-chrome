export function changeVolume(value) {
  return {
    type: 'SET_VOLUME',
    value: value
  };
}

export function changePlaybackState() {
  return { type: 'TOGGLE_PLAYBACK' };
}

export function resetStream() {
  return { type: 'RESET' };
}

export function setTrack(data) {
  return {
    type: 'SET_TRACK',
    data: data
  };
}
