import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {wrapStore} from 'react-chrome-redux';

import Player from './components/Player'
import rootReducer from './reducers';

const store = createStore(rootReducer, {});

wrapStore(store, {
  portName: 'RTU'
});

render(
  <Provider store={store}>
    <Player />
  </Provider>, document.body);

// Setup google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-84558963-1']);
_gaq.push(['_trackPageview']);

(() => {
  let ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  document.body.appendChild(ga);
})();
