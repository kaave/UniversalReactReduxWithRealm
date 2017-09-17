import { combineEpics, createEpicMiddleware } from 'redux-observable';

import categoriesEpics from './categories';
import newsEpics from './news';
import tagsEpics from './tags';

export default createEpicMiddleware(combineEpics(
  ...categoriesEpics,
  ...newsEpics,
  ...tagsEpics,
));
