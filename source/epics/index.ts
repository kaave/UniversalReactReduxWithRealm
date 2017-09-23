import { combineEpics, createEpicMiddleware } from 'redux-observable';

import categoriesEpics from './categories';
import groupsEpics from './groups';
import knowledgesEpics from './knowledges';
import newsEpics from './news';
import rolesEpics from './roles';
import tagsEpics from './tags';
import usersEpics from './users';

export default createEpicMiddleware(combineEpics(
  ...categoriesEpics,
  ...groupsEpics,
  ...knowledgesEpics,
  ...newsEpics,
  ...rolesEpics,
  ...tagsEpics,
  ...usersEpics,
));
