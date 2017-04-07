import React, { Component } from 'react';
import { connect } from 'react-redux';
import channel from '../channel';

class Player extends Component {
  componentDidMount()   {
    document.getElementById('audio-player').addEventListener('error', () => {
      console.log(audio.error);
      this.props.dispatch({
        type: 'RESET'
      });
    });

    channel.on('new_track', (payload) => {
      this.props.dispatch({
        type: 'TRACK_INFO',
        data: payload
      });
    });
  }

  render() {
    return (
      <div>
        <audio id='audio-player'></audio>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(Player);
