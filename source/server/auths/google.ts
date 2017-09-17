import { Router, Request, Response } from 'express';
import * as passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import * as dotenv from 'dotenv';
import * as shortid from 'shortid';
import * as jwt from 'jsonwebtoken';

import config from '../common/config';
import { getHashedString } from '../../common/utils';
import realm from '../databases/factory';
import * as User from '../databases/schemas/user';

dotenv.config();

function setupPassport() {
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  passport.use(new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID || 'YOU_MUST_DEFINE_GOOGLE_OAUTH_CLIENT_ID_TO_DOTENV',
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || 'YOU_MUST_DEFINE_GOOGLE_OAUTH_CLIENT_SECRETTO_DOTENV',
      // callbackURL: '/oauth/google-callback',
      callbackURL: 'http://localhost:3000/oauth/google-callback',
    },
    (accessToken, refreshToken, profile, done) => {
      if (!profile.emails || !profile.emails[0] || !profile.emails[0].value) {
        done(new Error(`Invalid email user: ${profile.displayName}`));
        return;
      }

      const email = profile.emails[0].value;
      const userObject = realm.objects<User.Types>(User.name).filtered('email = $0', email)[0];

      if (userObject) {
        done(null, userObject.id);
        return;
      }

      (async () => {
        // TODO: Repository的なクラスを作ってまとめる
        const newId = shortid.generate();
        const userData = {
          id: newId,
          userName: profile.displayName,
          displayName: profile.displayName,
          email,
          passwordHash: await getHashedString(email),
        };

        realm.write(() => realm.create<User.Types>(User.name, userData));
        done(null, newId);
      })();
    },
  ));
}

function setupRoute(router: Router) {
  router.get('/google', passport.authenticate('google', {
    failureRedirect: config.route.signin,
    session: false,
    scope: ['profile', 'email'],
  }), (_req: Request, _res: Response) => { /* dummy function: never called this */ });

  router.get('/google-callback', passport.authenticate('google', {
    failureRedirect: config.route.signin,
    session: false,
  }), (req: Request, res: Response) => {
    if (!req.user) {
      return res.status(404).json({ message: 'Something went wrong, please try again.' });
    }
    res.cookie(config.cookie.tokenKey, jwt.sign({ id: req.user }, config.session.secret));
    res.redirect('/');
  });
}

export function setup(router: Router) {
  setupPassport();
  setupRoute(router);
}
