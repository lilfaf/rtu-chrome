import React, {Component} from 'react';
import {connect} from 'react-redux';

import Cover from './Cover';
import CircularProgress from 'material-ui/CircularProgress';

class Track extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cover;
    if (this.props.cover) {
      cover = <Cover coverUrl={this.props.cover}/>;
    } else {
      cover = <CircularProgress className='valign center'/>;
    }

    return (
      <div className='card'>
        <div className='card-image'>
          <div className='cover valign-wrapper'>
            {cover}
          </div>
        </div>
        <div className='card-content track-info'>
          <h5>{this.props.title}</h5>
          <span className='caption grey-text'>par {this.props.artist}</span>
        </div>
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
    };
  }
  return {};
}

export default connect(mapStateToProps)(Track);
