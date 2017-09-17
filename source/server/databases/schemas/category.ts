// @flow

import * as Realm from 'realm';

export const name = 'Category';

import { Types as KnowledgeInfo } from './knowledgeInfo';

export interface Types {
  path: string;
  knowledges: KnowledgeInfo[];
  createAt: Date;
  updateAt: Date;
}

export default {
  name,
  primaryKey: 'path',
  properties: {
    path: 'string',
    knowledges: { type: 'list', objectType: 'KnowledgeInfo' },

    createAt: { type: 'date', default: new Date() },
    updateAt: { type: 'date', default: new Date() },
  } as Realm.PropertiesTypes,
} as Realm.Configuration;
