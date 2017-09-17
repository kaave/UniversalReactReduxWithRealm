// @no-flow

import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import reducers from '../reducers/';
import epicMiddleware from '../epics';

// const composeEnhancers = typeof window !== 'undefined' ?
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose :
//   compose;

function getAppliedMiddleware(isServer: boolean) {
  return isServer ? applyMiddleware(epicMiddleware) :
    applyMiddleware(epicMiddleware, logger);
}

export default function getStore({ preloadedState, isServer }: { preloadedState?: object, isServer?: boolean }) {
  return createStore(
    reducers,
    preloadedState || {},
    getAppliedMiddleware(isServer || false),
    // composeEnhancers(applyMiddleware(...middleware))
  );
}
