// @no-flow

import { Record } from 'immutable';

const defaultValue = {
  id: undefined,
  name: undefined,
  desc: undefined,
  createAt: undefined,
  updateAt: undefined,
};

export default class Group extends Record(defaultValue) {
  clone({ id, name, desc, createAt, updateAt } = {}) {
    let result = this;

    if (id) {
      result = result.set('id', id);
    }

    if (name) {
      result = result.set('name', name);
    }

    if (desc) {
      result = result.set('desc', desc);
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
