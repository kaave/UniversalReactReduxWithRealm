import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { combineReducers } from 'redux';

import * as Tags from '../actions/tags';
import { TagEntity } from '../entities/tag';

export interface State {
  tags: TagEntity[];
}

const initialState: State = {
  tags: [],
};

export const reducers = {
  tags: reducerWithInitialState(initialState.tags)
    .case(Tags.init, () => initialState.tags)
    .case(Tags.getDone, (action, getTags) => getTags),
};
