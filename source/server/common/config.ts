import { config as enableDotenvConfig } from 'dotenv';

enableDotenvConfig();

export default Object.freeze({
  isDevelopment: process.env.NODE_ENV === 'development',
  databases: {
    realm: {
      path: 'data/app.realm',
    },
  },
  port: parseInt(process.env.PORT || '', 10) || 9000,
  route: {
    root: '/',
    api: '/api',
    signin: '/signin',
    signout: '/signout',
  },
  view: {
    engine: 'ejs',
    path: './source/views/',
  },
  cookie: Object.freeze({
    maxAge: 60 * 60 * 24,
    tokenKey: process.env.COOKIE_TOKEN_KEY || 'AKCookieToken',
  }),
  session: Object.freeze({
    secret: process.env.COOKIE_SECRET || 'AKSessionSecret',
  }),
});
