import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App';

// Needed by material-ui for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = new Store({
  portName: 'RTU'
});

const unsubscribe = store.subscribe(() => {
  unsubscribe();
  render(
    <Provider store={store}>
      <App/>
    </Provider>
    , document.getElementById('app'));
});
