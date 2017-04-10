import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';
import { grey300, grey400 } from 'material-ui/styles/colors';
import { changePlaybackState, changeVolume } from '../../background/actions';

class Controls extends Component {
  _onVolumeChange(e, value) {
    this.props.dispatch(changeVolume(value));
  }

  _onPlayClick() {
    this.props.dispatch(changePlaybackState());
  }

  render() {
    return (
      <AppBar
        className='controls-navbar'
        iconElementLeft={
          <div>
            <IconButton onClick={this._onPlayClick.bind(this)}>
              <FontIcon className='material-icons'>
                {this.props.icon}
              </FontIcon>
            </IconButton>
          </div>
        }
        iconElementRight={
          <Slider
            id='volume'
            sliderStyle={{width: 100, margin: 0}}
            defaultValue={1.0}
            value={this.props.volume}
            onChange={this._onVolumeChange.bind(this)} />
        } />
    );
  }
}

const mapStateToProps = (state) => {
  if (state.player) {
    return {
      icon: state.player.icon,
      volume: state.player.volume
    }
  };
  return {};
}

export default connect(mapStateToProps)(Controls);
