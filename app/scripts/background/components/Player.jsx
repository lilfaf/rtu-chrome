import React, {Component} from 'react';

class Player extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <audio autoPlay="true"
               src="http://srv2.streaming-ingenierie.fr:8184/;stream/1">
        </audio>
      </div>
    );
  }
}

export default Player;
