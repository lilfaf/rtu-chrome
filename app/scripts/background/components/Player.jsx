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
    if (nextProps.volume !== undefined) {
      this.refs.player.volume = nextProps.volume
    }

    if (nextProps.playing) {
      this.refs.player.src = streamUrl
      this.refs.player.play()
    } else {
      this.refs.player.src = ''
      this.refs.player.load()
    }
  }

  render() {
    return (
      <div>
        <audio
          ref='player'
          id='audio-player'
          src={streamUrl}
          onError={(error) => {
            console.log(error)
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
