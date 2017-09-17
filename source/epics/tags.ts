import * as Rx from 'rxjs';
import 'isomorphic-fetch';
import 'typescript-fsa-redux-observable';
import { Action } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import * as Tags from '../actions/tags';
import { TagEntity } from '../entities/tag';

export function getTagsEntity() {
  return fetch('http://localhost:3000/api/tags')
    .then(data => data.json())
    .then((json: TagEntity[]) => json);
}

const getDoneEpic: Epic<Action, void> = (actions$, store) => actions$.ofAction(Tags.getStart)
  .mergeMap(
    action => Rx.Observable.fromPromise(getTagsEntity())
      .map(json => Tags.getDone(json)),
  );

export default [
  getDoneEpic,
];
