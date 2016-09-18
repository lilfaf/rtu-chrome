import React, {Component} from 'react';
import {connect} from 'react-redux';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
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

  render() {
    return (
      <div>
        <IconButton id="playback">
          <FontIcon className="material-icons">
            {this.props.icon}
          </FontIcon>
        </IconButton>
        <IconButton id="reset">
          <FontIcon color={grey300} hoverColor={grey400} className="material-icons">
            fast_forward
          </FontIcon>
        </IconButton>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.player) {
    return { icon: state.player.icon }
  }
  return {}
}

export default connect(mapStateToProps)(Controls);
