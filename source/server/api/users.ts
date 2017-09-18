import { Application, Request, Response, Router } from 'express';

import { getVerifyMiddleware } from '../auths/middlewares';
import * as user from '../data/repositories/user';

const router = Router();

// router.get('/', getVerifyMiddleware('Api'), (req: Request, res: Response) => {
router.get('/', (req: Request, res: Response) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.json(user.getAllUsersInfo());
});

export default router;
