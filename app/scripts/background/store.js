import { createStore } from 'redux';
import { wrapStore } from 'react-chrome-redux';
import reducers from './reducers';

const store = createStore(reducers, {});

wrapStore(store, {
  portName: 'RTU'
});

export default store;
