import { combineEpics, createEpicMiddleware } from 'redux-observable';

import newsEpics from './news';

export default createEpicMiddleware(combineEpics(
  ...newsEpics,
));
