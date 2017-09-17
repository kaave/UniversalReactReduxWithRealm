import * as Realm from 'realm';

import config from '../common/config';
import addLog from './events/addLog';
import * as Category from './schemas/category';
import * as Group from './schemas/group';
import * as KnowledgeInfo from './schemas/knowledgeInfo';
import * as KnowledgeReport from './schemas/knowledgeReport';
import * as Log from './schemas/log';
import * as Role from './schemas/role';
import * as Tag from './schemas/tag';
import * as User from './schemas/user';

const singletonRealm = new Realm({
  path: config.databases.realm.path,
  schema: [
    Category.default,
    Group.default,
    KnowledgeInfo.default,
    KnowledgeReport.default,
    Log.default,
    Role.default,
    Tag.default,
    User.default,
  ],
} as Realm.Configuration);

addLog(singletonRealm);

export default singletonRealm;
