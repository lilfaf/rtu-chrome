import React, {Component} from 'react';
import {connect} from 'react-redux';

import Preload from 'react-preload';
import LinearProgress from 'material-ui/LinearProgress';

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
        loadingIndicator={<LinearProgress mode='indeterminate' />}
        images={[this.props.coverUrl]}
        onError={this._handleImageLoadError}
        onSuccess={this._handleImageLoadSuccess.bind(this)}
        resolveOnError
        mountChildren
        >
        <div>
          {this.props.preloaded &&
            <img className='cover' src={this.props.coverUrl} />
          }
        </div>
      </Preload>
    );
  }
}

const mapStateToProps = (state) => {
  if (!!state.cover) { return state.cover; }
  return {};
}

export default connect(mapStateToProps)(Cover);
