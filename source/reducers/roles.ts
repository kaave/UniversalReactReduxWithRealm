import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { combineReducers } from 'redux';

import * as Roles from '../actions/roles';
import { RoleEntity } from '../entities/role';

export interface State {
  roles: RoleEntity[];
}

const initialState: State = {
  roles: [],
};

export const reducers = {
  roles: reducerWithInitialState(initialState.roles)
    .case(Roles.init, () => initialState.roles)
    .case(Roles.getDone, (action, getRoles) => getRoles),
};
