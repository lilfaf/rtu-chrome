import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cover from './Cover';

class Track extends Component {
  renderSocialLinks() {
    return this.props.metadatas.map((meta, i) => {
      const className = `fa fa-${meta.provider} fa-3x`
      return (
        <a key={i}
           onClick={() => {
             chrome.tabs.create({url: meta.link})
          }}>
          <i className={className}></i>
        </a>
      )
    })
  }

  render() {
    return (
      <div className='card'>
        <div className='card-image'>
          <div className='cover valign-wrapper'>
            {(this.props.metadatas && this.props.metadatas.length) &&
              <Cover coverUrl={this.props.metadatas[0].cover}/>
            }
          </div>
        </div>
        <div className='card-content track-info'>

          {(this.props.title && this.props.artist) &&
            <div>
              <h5>{this.props.title}</h5>
              <span className='caption grey-text'>par {this.props.artist}</span>
            </div>}

          {this.renderSocialLinks()}
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
