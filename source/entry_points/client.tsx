import 'babel-polyfill';
import 'font-awesome-webpack';
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { fromJS } from 'immutable';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import getStore from '../stores';
import Root from '../containers/Root';
import '../styles/index.css';

export const history = createHistory();

class Main {
  mountElement: HTMLElement;
  store: Store<{}>;

  constructor() {
    this.onDOMContentLoaded = this.onDOMContentLoaded.bind(this);
  }

  onDOMContentLoaded() {
    const mountElement = document.getElementById('mount-point');
    if (!mountElement) {
      throw new Error('Invalid mountElement: not found mountElement');
    }
    this.mountElement = mountElement;
    const { state } = this.mountElement.dataset;

    if (typeof state !== 'string') {
      throw new Error('Invalid initialState: not found preloadedState');
    }

    const plainState: { [key: string]: any } = JSON.parse(state);
    const preloadedState = { ...plainState, news: fromJS(plainState.news) };
    this.store = getStore({ preloadedState, history });
    this.render();
  }

  render() {
    render((
      <Provider store={this.store}>
        <ConnectedRouter history={history}>
          <Root />
        </ConnectedRouter>
      </Provider>
    ), this.mountElement);
  }
}

const main = new Main();
window.addEventListener('DOMContentLoaded', main.onDOMContentLoaded);
