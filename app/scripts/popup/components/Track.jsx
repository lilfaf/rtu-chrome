import React, {Component} from 'react';
import {connect} from 'react-redux';

import Cover from './Cover';

class Track extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='card'>
        <div className='card-image'>
          {this.props.cover &&
            <Cover coverUrl={this.props.cover}/>
          }
        </div>
        <div className='card-content track-info'>
          <h5>{this.props.title}</h5>
          <span className='caption grey-text'>by {this.props.artist}</span>
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
