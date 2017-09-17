import * as Realm from 'realm';

import { Types as Role } from './role';
import { Types as Group } from './group';
import { Types as KnowledgeInfo } from './knowledgeInfo';
import { Types as KnowledgeReport } from './knowledgeReport';

export const name = 'User';

export interface Types {
  id: string;
  userName: string;
  displayName: string;
  email: string;
  passwordHash: string;
  roles?: Role[];
  group?: Group;
  ownerKnowledges?: KnowledgeInfo[];
  editorKnowledges?: KnowledgeReport[];
  createAt?: Date;
  updateAt?: Date;
}

export default {
  name,
  primaryKey: 'id',
  properties: {
    id: 'string',
    userName: { type: 'string', indexed: true },
    displayName: 'string',
    email: { type: 'string', indexed: true },
    passwordHash: 'string',
    roles: { type: 'linkingObjects', objectType: 'Role', property: 'users' },
    group: { type: 'linkingObjects', objectType: 'Group', property: 'users' },
    ownerKnowledges: { type: 'list', objectType: 'KnowledgeInfo' },   // managementing knowledges
    editorKnowledges: { type: 'list', objectType: 'KnowledgeReport' },  // edited knowledges

    createAt: { type: 'date', default: new Date() },
    updateAt: { type: 'date', default: new Date() },
  } as Realm.PropertiesTypes,
} as Realm.Configuration;
