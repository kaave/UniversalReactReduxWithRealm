// @flow

import createUsers from './users';
import createRoles from './roles';
import createGroups from './groups';
import createCategories from './categories';
import createTags from './tags';
import createKnowledges from './knowledges';

export function grow() {
  createUsers();
  createRoles();
  createGroups();
  createCategories();
  createTags();
  createKnowledges();
}
