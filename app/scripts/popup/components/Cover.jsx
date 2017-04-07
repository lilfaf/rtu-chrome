import React, { Component } from 'react';
import { connect } from 'react-redux';
import Preload from 'react-preload';
import CircularProgress from 'material-ui/CircularProgress';

class Cover extends Component {
  constructor() {
    super();
    this.state = {
      preloadError: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.coverUrl !== nextProps.coverUrl) {
      this.setState({ preloadError: false });
    }
  }

  _onLoadError(images) {
    console.log(`preloading failed ${images}`);
    this.setState({ preloadError: true });
  }

  render() {
    return (
      <Preload
        loadingIndicator={
          <CircularProgress className='valign center'/>
        }
        images={[this.props.coverUrl]}
        onError={this._onLoadError}
        resolveOnError
        mountChildren>
        {!this.state.preloadError &&
          <img src={this.props.coverUrl} />
        }
      </Preload>
    );
  }
}

export default Cover;
