import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Player from './components/Player';

render(
  <Provider store={store}>
    <Player />
  </Provider>, document.getElementById('player'));

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
