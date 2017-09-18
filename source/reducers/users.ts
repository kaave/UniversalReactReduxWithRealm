import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { combineReducers } from 'redux';

import * as Users from '../actions/users';
import { UserSummaryEntity } from '../entities/userSummary';

export interface State {
  userSummaries: UserSummaryEntity[];
}

const initialState: State = {
  userSummaries: [],
};

export const reducers = {
  userSummaries: reducerWithInitialState(initialState.userSummaries)
    .case(Users.initSummaries, () => initialState.userSummaries)
    .case(Users.getSummariesDone, (action, getUserSummaries) => getUserSummaries),
};
