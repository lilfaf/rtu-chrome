import React, {Component} from 'react';
import {connect} from 'react-redux';

import Preload from 'react-preload';
import CircularProgress from 'material-ui/CircularProgress';

class Cover extends Component {
  constructor(props) {
    super(props);
  }

  _handleImageLoadError(images) {
    console.log(`failed to preload ${images}`);
    this.props.dispatch({
      type: 'PRELOAD_ERROR',
      value: true
    })
  }

  _handleImageLoadSuccess() {
    console.log(`preload succeed`);
  }

  render() {
    return (
      <Preload
        loadingIndicator={
          <CircularProgress className='valign center'/>
        }
        images={[this.props.coverURL]}
        onError={this._handleImageLoadError}
        onSuccess={this._handleImageLoadSuccess.bind(this)}
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
