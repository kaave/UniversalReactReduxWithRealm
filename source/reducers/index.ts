// @flow

import { combineReducers } from 'redux';

// import knowledgeForm from './knowledgeForm';
import * as categories from './categories';
import news from './news';

// tslint:disable-next-line no-empty-interface
export interface GlobalState extends categories.State {}

export default combineReducers({
  ...categories.reducers,
  ...news,
});
