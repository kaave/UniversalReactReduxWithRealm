import 'babel-polyfill';
import 'font-awesome-webpack';
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { fromJS } from 'immutable';

// import knowledgeForm from '../models/KnowledgeEditForm';
import getStore from '../stores';
import Root from '../containers/Root';
import '../styles/index.css';

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
    this.store = getStore({ preloadedState });
    this.render();
  }

  render() {
    render((
      <Provider store={this.store}>
        <Router>
          <Root />
        </Router>
      </Provider>
    ), this.mountElement);
  }
}

const main = new Main();
window.addEventListener('DOMContentLoaded', main.onDOMContentLoaded);
