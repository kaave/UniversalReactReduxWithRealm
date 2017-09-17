import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { combineReducers } from 'redux';

import * as News from '../actions/news';
import * as KnowledgeReport from '../server/databases/schemas/knowledgeReport';

export interface Reducers {
  news: KnowledgeReport.Types[];
}

const initialState: Reducers = {
  news: [],
};

const news = reducerWithInitialState(initialState.news)
  .case(News.init, () => [])
  .case(News.getDone, (action, getNews) => getNews);

export default {
  news,
};
