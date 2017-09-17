import { Router, Application } from 'express';

import * as google from './google';

const oauthRouter = Router();

google.setup(oauthRouter);

export function setOAuthRoutes(app: Application) {
  app.use('/oauth', oauthRouter);
}
