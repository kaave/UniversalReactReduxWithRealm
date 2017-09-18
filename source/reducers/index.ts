// @flow

import { combineReducers } from 'redux';

// import knowledgeForm from './knowledgeForm';
import * as categories from './categories';
import news from './news';
import * as groups from './groups';
import * as roles from './roles';
import * as tags from './tags';
import * as users from './users';

// tslint:disable-next-line no-empty-interface
export interface GlobalState extends
  categories.State,
  groups.State,
  roles.State,
  tags.State,
  users.State {}

export default combineReducers({
  ...categories.reducers,
  ...groups.reducers,
  ...roles.reducers,
  ...tags.reducers,
  ...users.reducers,
  ...news,
});
