import { Application, Request, Response, Router } from 'express';

import { getVerifyMiddleware } from '../auths/middlewares';
import * as role from '../data/repositories/role';

const router = Router();

// router.get('/', getVerifyMiddleware('Api'), (req: Request, res: Response) => {
router.get('/', (req: Request, res: Response) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.json(role.get());
});

export default router;
