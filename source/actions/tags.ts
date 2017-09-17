import actionCreatorFactory from 'typescript-fsa';

import { TagEntity } from '../entities/tag';

const actionCreator = actionCreatorFactory();

export type Types = 'TAGS_INIT' |
  'TAGS_GET_START' |
  'TAGS_GET_DONE' |
  'TAGS_GET_FAIL';

export const types = Object.freeze({
  init: 'TAGS_INIT',
  getStart: 'TAGS_GET_START',
  getDone: 'TAGS_GET_DONE',
  getFail: 'TAGS_GET_FAIL',
} as { [key: string]: Types });

export const init = actionCreator<void>(types.init);
export const getStart = actionCreator<void>(types.getStart);
export const getDone = actionCreator<TagEntity[]>(types.getDone);
export const getFail = actionCreator<void>(types.getFail);

export const actions = {
  init,
  getStart,
  getDone,
  getFail,
};
