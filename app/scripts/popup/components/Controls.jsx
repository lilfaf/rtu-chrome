import React, {Component} from 'react';
import {connect} from 'react-redux';

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
        <button id="playback" className="btn-flat btn-large waves-effect waves-light">
          <i className="material-icons">{this.props.icon}</i>
        </button>
        <button id="reset" className="btn-flat btn-large waves-effect waves-light">
          <i className="material-icons">fast_forward</i>
        </button>
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
