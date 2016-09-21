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
  }

  _handleImageLoadSuccess() {
    this.props.dispatch({
      type: 'PRELOADED'
    });
  }

  render() {
    return (
      <Preload
        loadingIndicator={
          <CircularProgress className='valign center'/>
        }
        images={[this.props.coverUrl]}
        onError={this._handleImageLoadError}
        onSuccess={this._handleImageLoadSuccess.bind(this)}
        resolveOnError
        mountChildren>
        {this.props.preloaded &&
          <img src={this.props.coverUrl} />
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
