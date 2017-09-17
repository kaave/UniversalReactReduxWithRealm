// @flow

import { combineReducers } from 'redux';

// import knowledgeForm from './knowledgeForm';
import * as categories from './categories';
import news from './news';
import * as tags from './tags';

// tslint:disable-next-line no-empty-interface
export interface GlobalState extends
  categories.State,
  tags.State {}

export default combineReducers({
  ...categories.reducers,
  ...tags.reducers,
  ...news,
});
