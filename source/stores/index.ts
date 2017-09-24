import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import reducers from '../reducers/';
import epicMiddleware from '../epics';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { History } from 'history';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnhancers = typeof window !== 'undefined' ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose :
  compose;

function getAppliedMiddleware(isServer: boolean, history?: History) {
  if (isServer || !history) {
    return applyMiddleware(epicMiddleware);
  } else {
    const historyMiddleware = routerMiddleware(history);
    return applyMiddleware(epicMiddleware, historyMiddleware, logger);
  }
}

interface Props {
  preloadedState?: object;
  isServer?: boolean;
  history?: History;
}

export default function getStore({ preloadedState, isServer, history }: Props) {
  return createStore(
    reducers,
    preloadedState || {},
    composeEnhancers(getAppliedMiddleware(isServer || false, history)),
  );
}
