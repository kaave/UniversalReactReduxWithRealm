import * as Rx from 'rxjs';
import 'isomorphic-fetch';
import 'typescript-fsa-redux-observable';
import { Action } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import * as Roles from '../actions/roles';
import { RoleEntity } from '../entities/role';

export function getRolesEntity() {
  return fetch('http://localhost:3000/api/roles')
    .then(data => data.json())
    .then((json: RoleEntity[]) => json);
}

const getDoneEpic: Epic<Action, void> = (actions$, store) => actions$.ofAction(Roles.getStart)
  .mergeMap(
    action => Rx.Observable.fromPromise(getRolesEntity())
      .map(json => Roles.getDone(json)),
  );

export default [
  getDoneEpic,
];
