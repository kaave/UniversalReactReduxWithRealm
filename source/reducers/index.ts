import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import knowledgeForm from './knowledgeForm';
import * as categories from './categories';
import news from './news';
import * as groups from './groups';
import * as knowledges from './knowledges';
import * as roles from './roles';
import * as tags from './tags';
import * as users from './users';

// tslint:disable-next-line no-empty-interface
export interface GlobalState extends
  categories.State,
  groups.State,
  knowledges.State,
  roles.State,
  tags.State,
  users.State {}

export default combineReducers({
  ...categories.reducers,
  ...groups.reducers,
  ...knowledges.reducers,
  ...roles.reducers,
  ...tags.reducers,
  ...users.reducers,
  ...news,
  router: routerReducer,
});
