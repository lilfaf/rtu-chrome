import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cover from './Cover';

class Track extends Component {
  render() {
    return (
      <div className='card'>
        <div className='card-image'>
          <div className='cover valign-wrapper'>
            {(this.props.metadatas && this.props.metadatas.length) &&
              <Cover coverURL={this.props.metadatas[0].cover}/>
            }
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
      metadatas: state.track.metadatas
    };
  }
  return {};
}

export default connect(mapStateToProps)(Track);
