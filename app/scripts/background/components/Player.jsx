import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sound from 'react-sound';
import channel from '../channel';
import { setTrack } from '../actions';

const streamUrl = 'http://srv2.streaming-ingenierie.fr:8184/;stream/1'

class Player extends Component {
  componentDidMount()   {
    channel.on('new_track', (data) => {
      this.props.dispatch(setTrack(data))
    });
  }

  render() {
    return (
      <div>
        {this.props.playing &&
          <Sound
            ref='player'
            url={streamUrl}
            volume={this.props.volume}
            playStatus={Sound.status.PLAYING}
            />
        }
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
