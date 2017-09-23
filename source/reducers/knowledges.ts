import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { combineReducers } from 'redux';

import * as Knowledges from '../actions/knowledges';
import { KnowledgeSummaryEntity } from '../entities/knowledgeSummary';

export interface State {
  knowledgeSummaries: KnowledgeSummaryEntity[];
  knowledgeIsRequesting: boolean;
}

const initialState: State = {
  knowledgeSummaries: [],
  knowledgeIsRequesting: false,
};

export const reducers = {
  knowledgeSummaries: reducerWithInitialState(initialState.knowledgeSummaries)
    .case(Knowledges.knowledgeSummariesInit, () => initialState.knowledgeSummaries)
    .case(Knowledges.knowledgeSummariesGetDone, (action, getKnowledgeSummaries) => getKnowledgeSummaries),
  isRequesting: reducerWithInitialState(initialState.knowledgeIsRequesting)
    .case(Knowledges.knowledgeSummariesInit, () => initialState.knowledgeIsRequesting)
    .case(Knowledges.knowledgeSummariesGetStart, () => true)
    .case(Knowledges.knowledgeSummariesGetDone, () => false)
    .case(Knowledges.knowledgeSummariesGetFail, () => false),
};
