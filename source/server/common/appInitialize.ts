import { Express } from 'express';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as passport from 'passport';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';

import config from './config';
import webpackClientConfig from '../../../tools/webpack/client';
import * as seed from '../databases/seeds';

function devServerInitialize(app: Express) {
  // set dev-middleware
  const compiler = webpack(webpackClientConfig as any);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: (webpackClientConfig as any).output.publicPath,
  }));
}

export default function appInitialize(app: Express) {
  if (config.isDevelopment) {
    // run seed
    seed.grow();
    console.log('seed OK');

    // set devServer
    devServerInitialize(app);
  }

  // set logger
  app.use(morgan('dev'));

  // set gzip
  app.use(compression());

  // set body parser(for post)
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // set cookie parser
  app.use(cookieParser());

  // set template engine
  app.set('view engine', config.view.engine);
  app.set('views', config.view.path); // from root path

  // set session
  app.use(expressSession({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: config.cookie.maxAge },
    // save server session info to redis
    // store: new RedisStore({
    //   host: config.redis.host,
    //   port: config.redis.port,
    //   db: config.redis.db,
    //   pass: config.redis.pass
    // }),
  }));

  app.use(passport.initialize());
  app.use(passport.session());
}
