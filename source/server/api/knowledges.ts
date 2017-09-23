import { Application, Request, Response, Router } from 'express';

import { getVerifyMiddleware } from '../auths/middlewares';
import * as knowledge from '../data/repositories/knowledge';

const router = Router();

interface RequestQuery {
  category?: string;
  user?: string;
}

// router.get('/', getVerifyMiddleware('Api'), (req: Request, res: Response) => {
router.get('/', (req: Request, res: Response) => {
  const query: knowledge.Query = {};
  const { category, user } = req.query as RequestQuery;
  if (category) {
    query.category = category;
  }
  if (user) {
    query.user = user;
  }
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.json(knowledge.getSummaries(query));
});

export default router;
