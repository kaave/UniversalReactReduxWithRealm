import * as Rx from 'rxjs';
import 'isomorphic-fetch';
import 'typescript-fsa-redux-observable';
import { Action } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import * as Groups from '../actions/groups';
import { GroupEntity } from '../entities/group';

export function getGroupsEntity() {
  return fetch('http://localhost:3000/api/groups')
    .then(data => data.json())
    .then((json: GroupEntity[]) => json);
}

const getDoneEpic: Epic<Action, void> = (actions$, store) => actions$.ofAction(Groups.getStart)
  .mergeMap(
    action => Rx.Observable.fromPromise(getGroupsEntity())
      .map(json => Groups.getDone(json)),
  );

export default [
  getDoneEpic,
];
