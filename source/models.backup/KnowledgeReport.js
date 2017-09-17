// @no-flow

import { Record } from 'immutable';

const defaultValue = {
  id: undefined,
  info: undefined,
  editor: undefined,
  source: undefined,
  createAt: undefined,
  updateAt: undefined,
};

export default class KnowledgeReport extends Record(defaultValue) {
  clone({ id, info, editor, source, createAt, updateAt } = {}) {
    let result = this;

    if (id) {
      result = result.set('id', id);
    }

    if (info) {
      result = result.set('info', info);
    }

    if (editor) {
      result = result.set('editor', editor);
    }

    if (source) {
      result = result.set('source', source);
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

