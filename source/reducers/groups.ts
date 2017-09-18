import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { combineReducers } from 'redux';

import * as Groups from '../actions/groups';
import { GroupEntity } from '../entities/group';

export interface State {
  groups: GroupEntity[];
}

const initialState: State = {
  groups: [],
};

export const reducers = {
  groups: reducerWithInitialState(initialState.groups)
    .case(Groups.init, () => initialState.groups)
    .case(Groups.getDone, (action, getGroups) => getGroups),
};
