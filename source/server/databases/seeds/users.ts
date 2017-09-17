// @flow

import * as shortid from 'shortid';

import realm from '../factory';
import * as user from '../schemas/user';

export const seeds = Object.freeze([
  {
    id: shortid.generate(),
    userName: 'owner',
    displayName: 'Mr. Owner',
    email: 'owner@add.ress',
    passwordHash: '$2a$10$oNUUG9ZmIXWnELEuSQKCq.dM4YTEvJExVjFHXmcZ4abYLzylynTeC',
    role: 'owner',
    groups: [
      'Manager',
      'Engineer',
    ],
  },
  {
    id: shortid.generate(),
    userName: 'admin',
    displayName: 'Mr. Admin',
    email: 'admin@add.ress',
    passwordHash: '$2a$10$3m0EQ7qpbr1ipTanCnx6FeLc/9SWAg8nOAF//LlHVkmxvJxt22tI2',
    role: 'admin',
    groups: [
      'Engineer',
    ],
  },
  {
    id: shortid.generate(),
    userName: 'member',
    displayName: 'Mr. Member',
    email: 'member@add.ress',
    passwordHash: '$2a$10$5wNq3dWR8RQNRyLgajUMjeP8OhM.DHQX8KAOhXovcF3aD20t.Kd8.',
    role: 'member',
    groups: [
      'Director',
    ],
  },
  {
    id: shortid.generate(),
    userName: 'guest',
    displayName: 'Mr. Guest',
    email: 'guest@add.ress',
    passwordHash: '$2a$10$ln/BRYYnfsIYKkRRW2ZoJOJ6OkrFUlkOi/EWn6xuTb4bO0zkbAz06',
    role: 'guest',
    groups: [],
  },
  {
    id: shortid.generate(),
    userName: 'kaave',
    displayName: 'Kyousuke Abe',
    email: 'mail@add.ress',
    passwordHash: '$2a$10$TEIDRwjTfFxNLuhAf4QUP.2OWCcs3xXp.sgLKBtXzntgLpt9KeJWK',
    role: 'owner',
    groups: [
      'Manager',
      'Engineer',
      'Designer',
      'Director',
    ],
  },
]);

export default function() {
  // create users
  seeds.forEach(({ id, userName, displayName, email, passwordHash }) => realm.write(() => {
    realm.create<user.Types>(user.name, { id, userName, displayName, email, passwordHash });
  }));
}
