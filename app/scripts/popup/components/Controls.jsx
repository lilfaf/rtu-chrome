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
      })
    });

    document.getElementById('reset').addEventListener('click', () => {
      this.props.dispatch({
        type: 'RESET'
      })
    });
  }

  handleVolume(event, value) {
    this.props.dispatch({
      type: 'SET_VOLUME',
      value: value
    })
  }

  render() {
    return (
      <AppBar
        iconElementLeft={
          <div id='controls'>
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
          <Slider
            id='volume'
            sliderStyle={{width: 100, margin: 0}}
            defaultValue={0.8}
            value={this.props.volume}
            onChange={this.handleVolume.bind(this)} />
          </div>
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
  }
  return {}
}

export default connect(mapStateToProps)(Controls);
