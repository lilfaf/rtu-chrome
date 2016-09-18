import React, {Component} from 'react';

const rtuStreamURL = "http://srv2.streaming-ingenierie.fr:8184/;stream/1"

class Player extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let audio = document.getElementById('audio-player');
    audio.addEventListener('error', () => {
      console.log(audio.error);
    });

    setInterval(this.props.dispatch({type: 'TRACK_INFO'}), 2000)
  }

  render() {
    return (
      <div>
        <audio id="audio-player"
               src={rtuStreamURL}>
        </audio>
      </div>
    );
  }
}

export default Player;
