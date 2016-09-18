import React, {Component} from 'react';
import {connect} from 'react-redux';

class TrackInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="track">
         <p className="center-align">{`${this.props.title} - ${this.props.artist}`}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.track) {
    return {
      title: state.track.title,
      artist: state.track.artist
    }
  }
  return {}
}

export default connect(mapStateToProps)(TrackInfo);
