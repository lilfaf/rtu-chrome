import { createStore, applyMiddleware } from 'redux';
import { wrapStore, alias } from 'react-chrome-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import aliases from './aliases';

const middleware = [
  alias(aliases),
  thunk
];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

wrapStore(store, {
  portName: 'RTU'
});

export default store;
