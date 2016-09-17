import React, {Component} from 'react';

class Player extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById('audio-player').addEventListener('error', (error) => {
      console.log(error)
    });
  }

  render() {
    return (
      <div>
        <audio id="audio-player"
               autoPlay="true"
               src="http://srv2.streaming-ingenierie.fr:8184/;stream/1">
        </audio>
      </div>
    );
  }
}

export default Player;
