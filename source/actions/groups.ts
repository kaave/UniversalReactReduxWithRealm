import actionCreatorFactory from 'typescript-fsa';

import { GroupEntity } from '../entities/group';

const actionCreator = actionCreatorFactory();

export type Types = 'GROUPS_INIT' |
  'GROUPS_GET_START' |
  'GROUPS_GET_DONE' |
  'GROUPS_GET_FAIL';

export const types = Object.freeze({
  init: 'GROUPS_INIT',
  getStart: 'GROUPS_GET_START',
  getDone: 'GROUPS_GET_DONE',
  getFail: 'GROUPS_GET_FAIL',
} as { [key: string]: Types });

export const init = actionCreator<void>(types.init);
export const getStart = actionCreator<void>(types.getStart);
export const getDone = actionCreator<GroupEntity[]>(types.getDone);
export const getFail = actionCreator<void>(types.getFail);

export const actions = {
  init,
  getStart,
  getDone,
  getFail,
};
