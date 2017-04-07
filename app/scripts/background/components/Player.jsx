import React, { Component } from 'react';
import { connect } from 'react-redux';
import channel from '../channel';
import { setTrack, resetStream } from '../../popup/actions';

class Player extends Component {
  componentDidMount()   {
    channel.on('new_track', (data) => {
      this.props.dispatch(setTrack(data))
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.volume !== undefined) {
      this.refs.player.volume = nextProps.volume
    }
  }

  render() {
    return (
      <div>
        <audio
          ref='player'
          id='audio-player'
          onError={() => {
            this.props.dispatch(resetStream())
          }}>
        </audio>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    volume: state.player.volume
  };
}

export default connect(mapStateToProps)(Player);
