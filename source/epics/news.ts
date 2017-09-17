// @flow

import * as Rx from 'rxjs';
import 'isomorphic-fetch';
import 'typescript-fsa-redux-observable';
import { Action } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import * as News from '../actions/news';

export function getNewsData(pageNo: number = 1) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${pageNo}`)
    .then(data => data.json())
    .then(({ name, email }): { name: string, email: string } => ({ name, email }));
}

const getDoneEpic: Epic<Action, void> = (actions$, store) => actions$.ofAction(News.getStart)
  .mergeMap(
    action => Rx.Observable.fromPromise(getNewsData(1))
      // .map((json: { name: string, email: string }) => News.getDone(json)),
      .map((json: { name: string, email: string }) => News.getDone([])),
  );

export default [
  getDoneEpic,
];
