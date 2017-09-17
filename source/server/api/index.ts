import { Application, Request, Response, Router } from 'express';

import config from '../common/config';
import { getVerifyMiddleware } from '../auths/middlewares';
import news from './news';
import categories from './categories';

const router = Router();
router.get('/', getVerifyMiddleware('Api'), (req: Request, res: Response) => {
  res.header('Content-Type', 'text/plain; charset=utf-8');
  res.send('Sorry, this url is NOT application\'s root 🌝');
});

router.use('/news', news);
router.use('/categories', categories);

export function setApiRoutes(app: Application) {
  app.use(config.route.api, router);
}
