import * as Realm from 'realm';

export const name = 'Group';

import { Types as User } from './user';
import { Types as KnowledgeInfo } from './knowledgeInfo';

export interface Types {
  name: string;
  desc: string;
  users?: User[];
  readKnowledges?: KnowledgeInfo[];
  editKnowledges?: KnowledgeInfo[];
  createAt?: Date;
  updateAt?: Date;
}

export default {
  name,
  primaryKey: 'name',
  properties: {
    name: 'string',
    desc: { type: 'string', indexed: true },
    users: { type: 'list', objectType: 'User' },
    readKnowledges: { type: 'linkingObjects', objectType: 'KnowledgeInfo', property: 'readGroups' },
    editKnowledges: { type: 'linkingObjects', objectType: 'KnowledgeInfo', property: 'editGroups' },

    createAt: { type: 'date', default: new Date() },
    updateAt: { type: 'date', default: new Date() },
  } as Realm.PropertiesTypes,
} as Realm.Configuration;
