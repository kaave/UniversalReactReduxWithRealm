// @no-flow

import { Record, List } from 'immutable';

const defaultValue = {
  id: undefined,
  name: undefined,
  knowledges: List([]),
  createAt: undefined,
  updateAt: undefined,
};

export default class Tag extends Record(defaultValue) {
  clone({ id, name, knowledges, createAt, updateAt } = {}) {
    let result = this;

    if (id) {
      result = result.set('id', id);
    }

    if (name) {
      result = result.set('name', name);
    }

    if (knowledges) {
      result = result.set('knowledges', knowledges);
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
