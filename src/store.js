import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';

import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createReduxStore = () => (
  process.env.NODE_ENV === 'production'
    ? createStore(reducers)
    : createStore(
        reducers,
        composeEnhancers(applyMiddleware(createLogger()))
      )
);

export default createReduxStore;