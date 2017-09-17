// @no-flow

import { Record, List } from 'immutable';

const defaultValue = {
  id: undefined,
  owner: undefined,
  title: '',
  category: '',
  tags: List(),
  readGroups: List(),
  editGroups: List(),
  notificationSlackChannel: undefined,
  canUnauthRead: false,
  isPrivate: false,
  reportId: undefined,
  source: '',
  createAt: undefined,
  updateAt: undefined,
};

export default class KnowledgeEditForm extends Record(defaultValue) {
  clone(props = {}) {
    return Object.entries(props)
      .reduce((tempResult, [key, value]) => tempResult.set(key, value), this);
  }
}
