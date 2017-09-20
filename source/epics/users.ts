import * as Rx from 'rxjs';
import 'isomorphic-fetch';
import 'typescript-fsa-redux-observable';
import { Action } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import * as Users from '../actions/users';
import { UserSummaryEntity } from '../entities/userSummary';

// TODO: やってることはDataStore層なんだよな〜
export function getUserSummariesEntity() {
  return fetch('http://localhost:3000/api/users')
    .then(data => data.json())
    .then((json: UserSummaryEntity[]) => json);
}

const getDoneEpic: Epic<Action, void> = (actions$, store) => actions$.ofAction(Users.getSummariesStart)
  .mergeMap(
    action => Rx.Observable.fromPromise(getUserSummariesEntity())
      .map(json => Users.getSummariesDone(json)),
  );

export default [
  getDoneEpic,
];
