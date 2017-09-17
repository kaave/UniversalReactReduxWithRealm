// @flow
import * as shortid from 'shortid';

import realm from '../factory';
import * as User from '../schemas/user';
import * as Role from '../schemas/role';
import { seeds } from './users';

const userSeeds = seeds;

export default function() {
  // create roles
  Role.seeds.forEach(key => realm.write(() => {
    const userObject = realm.objects<User.Types>(User.name);
    const userIds = userSeeds.filter(({ role }) => role === key).map(({ id: userId }) => userId);
    const users = userObject.filter(({ id }) => userIds.includes(id));
    realm.create(Role.name, { key, users });
  }));
}
