// @flow

import 'babel-polyfill';
import { config as enableDotenvConfig } from 'dotenv';
import * as express from 'express';

import config from './common/config';
import appInitialize from './common/appInitialize';
import routesInitialize from './common/routesInitialize';

enableDotenvConfig();

const app = express();

appInitialize(app);
routesInitialize(app);

// run application
app.listen(config.port, () => console.log('app running on localhost:', config.port));
