import { Application, Request, Response, Router } from 'express';

import { getVerifyMiddleware } from '../auths/middlewares';
import realm from '../databases/factory';
import * as knowledgeReport from '../databases/schemas/knowledgeReport';

const router = Router();

const pageLength = 20;

router.get('/', getVerifyMiddleware('Api'), (req: Request, res: Response) => {
  const offsets = req.query && parseInt(req.query.page, 10) ? parseInt(req.query.page, 10) : 0;
  const knowledgeReports = Array.from(realm.objects<knowledgeReport.Types>(knowledgeReport.name)
    .sorted('createAt', true)
    .slice(offsets, 20));
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.json(knowledgeReports);
});

export default router;
