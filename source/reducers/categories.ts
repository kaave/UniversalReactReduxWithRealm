import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { combineReducers } from 'redux';
import { cloneDeep } from 'lodash'; // TODO: いるのだけ引っ張りたい

import * as Categories from '../actions/categories';
import { CategoriesEntity } from '../entities/categories';
import { CategoriesTree } from '../entities/categoriesTree';

export interface State {
  categories: CategoriesTree;
  selectPath: string;
}

const initialState: State = {
  categories: {
    path: '/',
    fullPath: '/',
    count: 0,
    children: [],
    isOpen: true,
  },
  selectPath: '/',
};

function isOpenChange(categories: CategoriesTree, targetFullPath: string) {
  if (categories.fullPath === targetFullPath) {
    categories.isOpen = !categories.isOpen;
  } else {
    categories.children.forEach(childCategories => isOpenChange(childCategories, targetFullPath));
  }

  return categories;
}

export const reducers = {
  categories: reducerWithInitialState(initialState.categories)
    .case(Categories.categoriesInit, () => initialState.categories)
    .case(Categories.categoriesGetDone, (state, getCategories: CategoriesTree) => {
      // ルートはオープン状態
      getCategories.isOpen = true;
      return getCategories;
    })
    .case(Categories.categoryTreeIsOpenChange, (state, targetFullPath) => (
      isOpenChange(cloneDeep(state), targetFullPath)),
    ),
  selectPath: reducerWithInitialState(initialState.selectPath)
    .case(Categories.categoryTreeSelect, (state, selectPath) => selectPath),
};
