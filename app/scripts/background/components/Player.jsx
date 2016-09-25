import React, {Component} from 'react';
import {connect} from 'react-redux';
import { configureChannel } from '../channel';

class Player extends Component {
  constructor(props) {
    super(props);
    this.channel = configureChannel();
  }

  componentDidMount()   {
    document.getElementById('audio-player').addEventListener('error', () => {
      console.log(audio.error);
      this.props.dispatch({
        type: 'RESET'
      });
    });

    this.channel.on('new_track', (payload) => {
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
