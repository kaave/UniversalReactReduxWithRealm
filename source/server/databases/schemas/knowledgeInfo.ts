import * as Realm from 'realm';

export const name = 'KnowledgeInfo';

import { Types as Category } from './category';
import { Types as User } from './user';
import { Types as Group } from './group';
import { Types as Tag } from './tag';
import { Types as KnowledgeReport } from './knowledgeReport';

export interface Types {
  id: string;
  owner: User[];
  title: string;
  category?: Category[];
  tags?: Tag[];
  readGroups?: Group[];
  editGroups?: Group[];
  notificationSlackChannel: string;
  canUnauthRead: boolean;
  isPrivate: boolean;
  reports?: KnowledgeReport[];

  createAt?: Date;
  updateAt?: Date;
}

export default {
  name,
  primaryKey: 'id',
  properties: {
    id: 'string',
    owner: { type: 'linkingObjects', objectType: 'User', property: 'ownerKnowledges' },
    title: 'string',
    category: { type: 'linkingObjects', objectType: 'Category', property: 'knowledges' },
    tags: { type: 'list', objectType: 'Tag' },
    readGroups: { type: 'list', objectType: 'Group' },
    editGroups: { type: 'list', objectType: 'Group' },
    notificationSlackChannel: 'string',
    canUnauthRead: { type: 'bool', default: false },
    isPrivate: { type: 'bool', default: false },
    reports: { type: 'list', objectType: 'KnowledgeReport' },

    createAt: { type: 'date', default: new Date() },
    updateAt: { type: 'date', default: new Date() },
  } as Realm.PropertiesTypes,
} as Realm.Configuration;
