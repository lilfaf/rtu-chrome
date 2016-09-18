import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import App from './components/App';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = new Store({
  portName: 'RTU'
});

render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('app'));
