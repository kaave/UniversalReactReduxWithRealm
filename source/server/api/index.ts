import { Application, Request, Response, Router } from 'express';

import config from '../common/config';
import { getVerifyMiddleware } from '../auths/middlewares';
import categories from './categories';
import groups from './groups';
import knowledges from './knowledges';
import news from './news';
import roles from './roles';
import tags from './tags';
import users from './users';

const router = Router();
router.get('/', getVerifyMiddleware('Api'), (req: Request, res: Response) => {
  res.header('Content-Type', 'text/plain; charset=utf-8');
  res.send('Sorry, this url is NOT application\'s root 🌝');
});

router.use('/categories', categories);
router.use('/groups', groups);
router.use('/knowledges', knowledges);
router.use('/news', news);
router.use('/roles', roles);
router.use('/tags', tags);
router.use('/users', users);

export function setApiRoutes(app: Application) {
  app.use(config.route.api, router);
}
