import React, {Component} from 'react';
import {connect} from 'react-redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';
import {grey300, grey400} from 'material-ui/styles/colors';

class Controls extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById('playback').addEventListener('click', () => {
      this.props.dispatch({
        type: 'TOGGLE_PLAYBACK'
      });
    });

    document.getElementById('reset').addEventListener('click', () => {
      this.props.dispatch({
        type: 'RESET'
      });
    });
  }

  handleVolume(e, value) {
    this.props.dispatch({
      type: 'SET_VOLUME',
      value: value
    })
  }

  render() {
    return (
      <AppBar
        className='controls-navbar'
        iconElementLeft={
          <div>
            <IconButton id='playback'>
              <FontIcon className='material-icons'>
                {this.props.icon}
              </FontIcon>
            </IconButton>
            <IconButton id='reset'>
              <FontIcon color={grey300} hoverColor={grey400} className='material-icons'>
                fast_forward
              </FontIcon>
            </IconButton>
          </div>
        }
        iconElementRight={
          <Slider
            id='volume'
            sliderStyle={{width: 100, margin: 0}}
            defaultValue={0.8}
            value={this.props.volume}
            onChange={this.handleVolume.bind(this)} />
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
