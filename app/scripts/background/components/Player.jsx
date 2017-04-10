import React, { Component } from 'react';
import { connect } from 'react-redux';
import channel from '../channel';
import { setTrack } from '../actions';

const streamUrl = 'http://srv2.streaming-ingenierie.fr:8184/;stream/1'

class Player extends Component {
  componentDidMount()   {
    channel.on('new_track', (data) => {
      this.props.dispatch(setTrack(data))
    });
  }

  componentWillReceiveProps(nextProps) {
    const player = this.refs.player

    if (nextProps.volume !== undefined) {
      player.volume = nextProps.volume
    }

    if (nextProps.playing) {
      player.src = streamUrl
      player.play()
    } else {
      player.src = ''
    }
  }

  render() {
    return (
      <div>
        <audio
          ref='player'
          src={streamUrl}>
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
