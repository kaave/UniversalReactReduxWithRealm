import * as Realm from 'realm';

export const name = 'KnowledgeReport';

import { Types as User } from './user';
import { Types as KnowledgeInfo } from './knowledgeInfo';

export interface Types {
  id: string;
  info?: KnowledgeInfo;
  editor?: User;
  source: string;
  createAt: Date;
  updateAt: Date;
}

export default {
  name,
  primaryKey: 'id',
  properties: {
    id: 'string',
    info: { type: 'linkingObjects', objectType: 'KnowledgeInfo', property: 'reports' },
    editor: { type: 'linkingObjects', objectType: 'User', property: 'editorKnowledges' },
    source: 'string',

    createAt: { type: 'date', default: new Date() },
    updateAt: { type: 'date', default: new Date() },
  } as Realm.PropertiesTypes,
} as Realm.Configuration;
