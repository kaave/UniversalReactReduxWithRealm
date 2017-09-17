import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { combineReducers } from 'redux';

import * as Categories from '../actions/categories';
import { CategoriesEntity } from '../entities/categories';

export interface State {
  categories: CategoriesEntity;
}

const initialState: State = {
  categories: {
    path: '/',
    count: 0,
    children: [],
  },
};

export const reducers = {
  categories: reducerWithInitialState(initialState.categories)
    .case(Categories.init, () => initialState.categories)
    .case(Categories.getDone, (action, getCategories) => getCategories),
};
