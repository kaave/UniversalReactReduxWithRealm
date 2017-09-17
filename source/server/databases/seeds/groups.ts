// @flow

import * as shortid from 'shortid';

import realm from '../factory';
import * as User from '../schemas/user';
import * as Group from '../schemas/group';
import { seeds as userSeeds } from './users';

const groupSeeds: Array<{ name: string, desc: string }> = [
  { name: 'Manager', desc: '管理者' },
  { name: 'Engineer', desc: 'エンジニア' },
  { name: 'Designer', desc: 'デザイナー' },
  { name: 'Director', desc: 'ディレクター' },
];

export default function() {
  groupSeeds.forEach(seed => realm.write(() => {
    const userObject = realm.objects<User.Types>(User.name);
    const joinUserIds = userSeeds.filter(user => user.groups.includes(seed.name)).map(user => user.id);
    const users = userObject.filter(({ id }) => joinUserIds.includes(id));
    realm.create(Group.name, { ...seed, users });
  }));
}
