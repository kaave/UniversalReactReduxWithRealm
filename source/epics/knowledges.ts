import * as Rx from 'rxjs';
import 'isomorphic-fetch';
import 'typescript-fsa-redux-observable';
import { Action } from 'redux';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';

import * as Knowledges from '../actions/knowledges';
import { KnowledgeSummaryEntity } from '../entities/knowledgeSummary';

export function getKnowledgeSummariesEntity({ category }: { category: string }) {
  return fetch(`http://localhost:3000/api/knowledges?category=${category}`)
    .then(data => data.json())
    .then((json: KnowledgeSummaryEntity[]) => json);
}

const knowledgeSummariesGetDoneEpic: Epic<Action, void> = (actions$, store) => (
  actions$.ofAction(Knowledges.knowledgeSummariesGetStart)
    .mergeMap(({ payload }) => Rx.Observable.fromPromise(getKnowledgeSummariesEntity({ category: payload }))
      .map(json => Knowledges.knowledgeSummariesGetDone(json)),
    )
);

export default [
  knowledgeSummariesGetDoneEpic,
];
