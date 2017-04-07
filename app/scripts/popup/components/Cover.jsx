import React, { Component } from 'react';
import { connect } from 'react-redux';
import Preload from 'react-preload';
import CircularProgress from 'material-ui/CircularProgress';

class Cover extends Component {
  _onLoadError(images) {
    console.log(`failed to preload ${images}`);
    this.props.dispatch({
      type: 'PRELOAD_ERROR',
      value: true
    })
  }

  render() {
    return (
      <Preload
        loadingIndicator={
          <CircularProgress className='valign center'/>
        }
        images={[this.props.coverURL]}
        onError={this._onLoadError}
        resolveOnError
        mountChildren>
        {!this.props.preloadError &&
          <img src={this.props.coverURL} />
        }
      </Preload>
    );
  }
}

const mapStateToProps = (state) => {
  if (!!state.cover) { return state.cover; }
  return {};
}

export default connect(mapStateToProps)(Cover);
