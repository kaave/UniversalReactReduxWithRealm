// @no-flow

import { Record } from 'immutable';

const defaultValue = {
  id: undefined,
  desc: undefined,
  users: [],
  createAt: undefined,
  updateAt: undefined,
};

export default class Role extends Record(defaultValue) {
  clone({ id, desc, users, createAt, updateAt } = {}) {
    let result = this;

    if (id) {
      result = result.set('id', id);
    }

    if (desc) {
      result = result.set('desc', desc);
    }

    if (users) {
      result = result.set('users', users);
    }

    if (createAt) {
      result = result.set('createAt', createAt);
    }

    if (updateAt) {
      result = result.set('updateAt', updateAt);
    }

    return result;
  }
}
