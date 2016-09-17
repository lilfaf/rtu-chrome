import React from 'react';
import {render} from 'react-dom';

import {createStore} from 'redux';
import {wrapStore} from 'react-chrome-redux';

import Player from './components/Player'
import rootReducer from './reducers';

const store = createStore(rootReducer, {});

wrapStore(store, {
  portName: 'RTU'
});

render(<Player />, document.body);
