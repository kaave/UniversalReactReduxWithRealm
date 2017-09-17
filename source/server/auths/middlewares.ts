import * as expressJwt from 'express-jwt';
import { compose, Middleware } from 'compose-middleware';
import { Request, Response, NextFunction } from 'express';

import config from '../common/config';

export type VerifyType = 'Normal' | 'Api' | 'RedirectRoot';

const validateJwt = expressJwt({ secret: config.session.secret });

function validate(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.cookies[config.cookie.tokenKey]) {
    req.headers.authorization = `Bearer ${req.cookies[config.cookie.tokenKey]}`;
  }

  validateJwt(req, res, next);
}

export function getVerifyMiddleware(type: VerifyType): Middleware {
  return compose([
    validate,
    (error: Error, req: Request, res: Response, next: NextFunction) => {
      if (error) {
        // cleaning client
        if (req.session) {
          req.session.destroy(() => {/* DUMMY FUNCTION */});
        }
        res.clearCookie(config.cookie.tokenKey);

        if (type === 'Api') {
          return res.status(401).send(error.name);
        }

        return res.redirect(config.route.signin);
      }

      next();
    },
  ]);
}
