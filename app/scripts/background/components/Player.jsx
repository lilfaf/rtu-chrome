import React, { Component } from 'react';
import { connect } from 'react-redux';
import channel from '../channel';
import { setTrack, resetStream } from '../actions';

const streamUrl = 'http://srv2.streaming-ingenierie.fr:8184/;stream/1'

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

    if (nextProps.playing) {
      this.refs.player.play()
    } else {
      this.refs.player.pause()
    }
  }

  render() {
    return (
      <div>
        <audio
          ref='player'
          id='audio-player'
          src={streamUrl}
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
    volume: state.player.volume,
    playing: state.player.playing
  };
}

export default connect(mapStateToProps)(Player);
