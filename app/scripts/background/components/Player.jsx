import React, {Component} from 'react';

class Player extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById('audio-player').addEventListener('error', () => {
      console.log(player.error);
    });
  }

  render() {
    return (
      <div>
        <audio id="audio-player"
               src="http://srv2.streaming-ingenierie.fr:8184/;stream/1">
        </audio>
      </div>
    );
  }
}

export default Player;
