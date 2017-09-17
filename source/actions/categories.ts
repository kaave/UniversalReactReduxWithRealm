import actionCreatorFactory from 'typescript-fsa';

import { CategoriesEntity } from '../entities/categories';

const actionCreator = actionCreatorFactory();

export type Types = 'CATEGORIES_INIT' |
  'CATEGORIES_GET_START' |
  'CATEGORIES_GET_DONE' |
  'CATEGORIES_GET_FAIL';

export const types = Object.freeze({
  init: 'CATEGORIES_INIT',
  getStart: 'CATEGORIES_GET_START',
  getDone: 'CATEGORIES_GET_DONE',
  getFail: 'CATEGORIES_GET_FAIL',
} as { [key: string]: Types });

export const init = actionCreator<void>(types.init);
export const getStart = actionCreator<void>(types.getStart);
export const getDone = actionCreator<CategoriesEntity>(types.getDone);
export const getFail = actionCreator<void>(types.getFail);

export const actions = {
  init,
  getStart,
  getDone,
  getFail,
};
