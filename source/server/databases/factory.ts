import * as Realm from 'realm';

import config from '../common/config';
import * as User from './schemas/user';
import * as Role from './schemas/role';
import * as Group from './schemas/group';
import * as KnowledgeInfo from './schemas/knowledgeInfo';
import * as KnowledgeReport from './schemas/knowledgeReport';
import * as Category from './schemas/category';
import * as Tag from './schemas/tag';

const singletonRealm = new Realm({
  path: config.databases.realm.path,
  schema: [
    User.default,
    Role.default,
    Group.default,
    KnowledgeInfo.default,
    KnowledgeReport.default,
    Category.default,
    Tag.default,
  ],
} as Realm.Configuration);

export default singletonRealm;
