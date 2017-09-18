import actionCreatorFactory from 'typescript-fsa';

import { RoleEntity } from '../entities/role';

const actionCreator = actionCreatorFactory();

export type Types = 'ROLES_INIT' |
  'ROLES_GET_START' |
  'ROLES_GET_DONE' |
  'ROLES_GET_FAIL';

export const types = Object.freeze({
  init: 'ROLES_INIT',
  getStart: 'ROLES_GET_START',
  getDone: 'ROLES_GET_DONE',
  getFail: 'ROLES_GET_FAIL',
} as { [key: string]: Types });

export const init = actionCreator<void>(types.init);
export const getStart = actionCreator<void>(types.getStart);
export const getDone = actionCreator<RoleEntity[]>(types.getDone);
export const getFail = actionCreator<void>(types.getFail);

export const actions = {
  init,
  getStart,
  getDone,
  getFail,
};
