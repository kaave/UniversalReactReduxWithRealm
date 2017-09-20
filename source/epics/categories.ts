import * as Rx from 'rxjs';
import 'isomorphic-fetch';
import 'typescript-fsa-redux-observable';
import { Action } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import * as Categories from '../actions/categories';
import { CategoriesEntity } from '../entities/categories';

export function getCategoriesEntity() {
  return fetch('http://localhost:3000/api/categories')
    .then(data => data.json())
    .then((json: CategoriesEntity) => json);
}

const getDoneEpic: Epic<Action, void> = (actions$, store) => actions$.ofAction(Categories.categoriesGetStart)
  .mergeMap(
    action => Rx.Observable.fromPromise(getCategoriesEntity())
      .map(json => Categories.categoriesGetDone(json)),
  );

export default [
  getDoneEpic,
];
