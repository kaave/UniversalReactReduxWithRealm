import * as Realm from 'realm';

import { Types as KnowledgeInfo } from './knowledgeInfo';

export const name = 'Tag';

export interface Types {
  name: string;
  knowledges?: KnowledgeInfo[];
  createAt?: Date;
  updateAt?: Date;
}

export default {
  name,
  primaryKey: 'name',
  properties: {
    name: 'string',
    knowledges: { type: 'linkingObjects', objectType: 'KnowledgeInfo', property: 'tags' },

    createAt: { type: 'date', default: new Date() },
    updateAt: { type: 'date', default: new Date() },
  } as Realm.PropertiesTypes,
} as Realm.Configuration;
