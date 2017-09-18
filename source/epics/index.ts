import { combineEpics, createEpicMiddleware } from 'redux-observable';

import categoriesEpics from './categories';
import groupsEpics from './groups';
import newsEpics from './news';
import rolesEpics from './roles';
import tagsEpics from './tags';
import usersEpics from './users';

export default createEpicMiddleware(combineEpics(
  ...categoriesEpics,
  ...groupsEpics,
  ...newsEpics,
  ...rolesEpics,
  ...tagsEpics,
  ...usersEpics,
));
