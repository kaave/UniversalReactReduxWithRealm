import * as Realm from 'realm';

import { Types as User } from './user';

export type Role = 'owner' |   // 最強 なんでもできる
                   'admin' |   // システムの初期化以外はなんでもできる
                   'member' | // 一般人
                   'guest';     // ゲスト 編集できない

export const name = 'Role';

export const seeds: Role[] = [
  'owner',
  'admin',
  'member',
  'guest',
];

export interface Types {
    key: string;
    users: User[];
    createAt: Date;
    updateAt: Date;
}

export default {
  name,
  primaryKey: 'key',
  properties: {
    key: 'string',
    users: { type: 'list', objectType: 'User' },

    createAt: { type: 'date', default: new Date() },
    updateAt: { type: 'date', default: new Date() },
  } as Realm.PropertiesTypes,
} as Realm.Configuration;
