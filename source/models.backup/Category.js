// @no-flow

import { Record, List } from 'immutable';

const defaultValue = {
  id: undefined,
  path: undefined,
  knowledges: List([]),
  createAt: undefined,
  updateAt: undefined,
};

export default class Category extends Record(defaultValue) {
  clone({ id, path, knowledges, createAt, updateAt } = {}) {
    let result = this;

    if (id) {
      result = result.set('id', id);
    }

    if (path) {
      result = result.set('path', path);
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
