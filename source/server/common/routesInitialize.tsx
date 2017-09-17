import * as express from 'express';
import * as expressSession from 'express-session';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet, HelmetData } from 'react-helmet';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter as Router, matchPath } from 'react-router';

import config from './config';
import { setApiRoutes } from '../api';
import { setOAuthRoutes } from '../auths';
import { getVerifyMiddleware } from '../auths/middlewares';
// import { GlobalState } from '../../reducers';
import * as Routes from '../../routes';
import getStore from '../../stores';
import Root from '../../containers/Root';
import UniversalComponent from '../../types/UniversalComponent';

export default function routesInitialize(app: express.Express) {
  // set assets path
  app.use(express.static('./assets'));
  app.use(express.static('./build'));

  // set static pages
  app.get(config.route.signin, (req: express.Request, res: express.Response) => {
    if (req.session && req.cookies[config.cookie.tokenKey]) {
      // TODO: サインイン済みの場合はrootへ飛ばす
      res.redirect(config.route.root);
      return;
    }

    res.render('signin');
  });
  app.get(config.route.signout, getVerifyMiddleware('Normal'), (req: express.Request, res: express.Response) => {
    if (!req.session) {
      res.redirect(config.route.signin);
      return;
    }
    req.session.destroy(() => {
      res.clearCookie(config.cookie.tokenKey);
      res.redirect(config.route.signin);
    });
  });

  // set api
  setApiRoutes(app);

  // set OAuth
  setOAuthRoutes(app);

  // set React routes
  app.get('*', getVerifyMiddleware('Normal'), async (req: express.Request, res: express.Response) => {
    if (!req.session || !req.cookies[config.cookie.tokenKey]) {
      res.redirect(config.route.signin);
      return;
    }

    const store = getStore({ isServer: true });
    const foundPath = Routes.routes.find(({ path, exact }) => (
      matchPath(req.url, { path, exact, strict: false }) != null
    ));

    const component = (foundPath && (foundPath.component || {})) as UniversalComponent;
    const fetchData = (component && component.fetchData) ||
      ((_data: { store: any, params: any }) => new Promise(resolve => resolve()));
    const params = foundPath && foundPath.params ? foundPath.params : {};
    await fetchData({ store, params });
    const preloadedState = JSON.stringify(store.getState());
    const context: Routes.Context = {};  // Routerが中身をいじってくれるっぽい・・・わかりにくい・・・
    const markup = renderToString(
      <Provider store={store}>
        <Router context={context} location={req.url}>
          <Root />
        </Router>
      </Provider>,
    );

    if (context.url && context.status) {
      res.redirect(context.status, `http://${req.headers.host + context.url}`);
      return;
    }

    const helmetData = Helmet.renderStatic();
    const props = {
      ...helmetData,
      markup,
      preloadedState,
      session: req.session,
      token: req.cookies[config.cookie.tokenKey],
    };
    if (typeof foundPath === 'undefined' || foundPath.path === '/404') {
      res.status(404).render('error', { ...props, code: 404 });
      return;
    }

    res.render('index', props);
  });
}
