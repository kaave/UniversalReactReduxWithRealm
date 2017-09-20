import actionCreatorFactory from 'typescript-fsa';

import { CategoriesEntity } from '../entities/categories';

const actionCreator = actionCreatorFactory();

export type Types = 'CATEGORIES_INIT' |
  'CATEGORIES_GET_START' |
  'CATEGORIES_GET_DONE' |
  'CATEGORIES_GET_FAIL' |
  'CATEGORY_TREE_IS_OPEN_CHANGE' |
  'CATEGORY_TREE_SELECT' ;

export const types = Object.freeze({
  categoriesInit: 'CATEGORIES_INIT',
  categoriesGetStart: 'CATEGORIES_GET_START',
  categoriesGetDone: 'CATEGORIES_GET_DONE',
  categoriesGetFail: 'CATEGORIES_GET_FAIL',
  categoryTreeIsOpenChange: 'CATEGORY_TREE_IS_OPEN_CHANGE',
  categoryTreeSelect: 'CATEGORY_TREE_SELECT',
} as { [key: string]: Types });

export const categoriesInit = actionCreator<void>(types.categoriesInit);
export const categoriesGetStart = actionCreator<void>(types.categoriesGetStart);
export const categoriesGetDone = actionCreator<CategoriesEntity>(types.categoriesGetDone);
export const categoriesGetFail = actionCreator<void>(types.categoriesGetFail);
export const categoryTreeIsOpenChange = actionCreator<string>(types.categoryTreeIsOpenChange);
export const categoryTreeSelect = actionCreator<string>(types.categoryTreeSelect);

export const actions = {
  categoriesInit,
  categoriesGetStart,
  categoriesGetDone,
  categoriesGetFail,
  categoryTreeIsOpenChange,
  categoryTreeSelect,
};
