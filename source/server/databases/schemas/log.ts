import * as Realm from 'realm';

import { Types as User } from './user';
import { Types as KnowledgeInfo } from './knowledgeInfo';
import { Types as knowledgeReport } from './knowledgeReport';

export type Case = 'createKnowledge' |
                   'updateKnowledge' |
                   'newUser';

export const name = 'Log';

export const seeds: Case[] = [
  'createKnowledge',
  'updateKnowledge',
  'newUser',
];

export interface Types {
  id: string;
  case: Case;
  userId: string;
  userName: string;
  knowledgeInfoId?: string;
  knowledgeInfoName?: string;
  createAt?: Date;
  updateAt?: Date;
}

export default {
  name,
  primaryKey: 'id',
  properties: {
    id: 'string',
    case: 'string',
    userId: 'string',
    userName: 'string',
    knowledgeInfoId: { type: 'string', default: '' },
    knowledgeInfoName: { type: 'string', default: '' },

    createAt: { type: 'date', default: new Date() },
    updateAt: { type: 'date', default: new Date() },
  } as Realm.PropertiesTypes,
} as Realm.Configuration;

