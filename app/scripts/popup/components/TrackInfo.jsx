import React, {Component} from 'react';
import {connect} from 'react-redux';

class TrackInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
         <p className="center-align flow-text">{`${this.props.title} - ${this.props.artist}`}</p>
         <img src={this.props.cover}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.track) {
    return {
      title: state.track.title,
      artist: state.track.artist,
      cover: state.track.cover,
      link: state.track.link
    }
  }
  return {}
}

export default connect(mapStateToProps)(TrackInfo);
