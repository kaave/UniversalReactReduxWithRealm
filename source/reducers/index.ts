// @flow

import { combineReducers } from 'redux';

// import knowledgeForm from './knowledgeForm';
import news from './news';

export interface GlobalState {}

export default combineReducers({
  ...news,
});
