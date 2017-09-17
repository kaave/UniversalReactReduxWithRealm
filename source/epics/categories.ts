// @flow

import * as Rx from 'rxjs';
import 'isomorphic-fetch';
import 'typescript-fsa-redux-observable';
import { Action } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import * as Categories from '../actions/categories';
import { CategoryEntity } from '../entities/category';
import { CategoriesEntity } from '../entities/categories';

export function getCategoriesEntity() {
  return fetch('http://localhost:3000/api/categories')
    .then(data => data.json())
    .then((json: CategoryEntity[]) => {
      return json.reduce((tempData, { path, count }) => {
        const pathTree = path.split('/');
        let parentInfo = tempData;

        // initialize
        pathTree.forEach((pathDetail, index) => {
          let currentInfo = parentInfo.children.find(info => info.path === pathDetail);
          if (!currentInfo) {
            currentInfo = {
              path: pathDetail,
              count: 0,
              children: [],
            };

            parentInfo.children.push(currentInfo);
          }
          parentInfo = currentInfo;
        });

        // calc count
        const matchRoutes: Array<CategoriesEntity | undefined> = [tempData];
        for (let i = 0, l = pathTree.length; i < l; i += 1) {
          const lastMatchRoute = matchRoutes[matchRoutes.length - 1];
          if (lastMatchRoute) {
            matchRoutes.push(lastMatchRoute.children.find(route => route.path === pathTree[i]));
          }
        }
        matchRoutes.forEach(route => route && (route.count += count));
        return tempData;
      }, {
        path: '/',
        count: 0,
        children: [],
      } as CategoriesEntity);
    });
}

const getDoneEpic: Epic<Action, void> = (actions$, store) => actions$.ofAction(Categories.getStart)
  .mergeMap(
    action => Rx.Observable.fromPromise(getCategoriesEntity())
      .map(json => Categories.getDone(json)),
  );

export default [
  getDoneEpic,
];
