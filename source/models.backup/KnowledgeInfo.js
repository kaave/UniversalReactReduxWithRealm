// @no-flow

import { Record, List } from 'immutable';

const defaultValue = {
  id: undefined,
  owner: undefined,
  title: undefined,
  category: undefined,
  tags: List([]),
  readGroups: List([]),
  editGroups: List([]),
  notificationSlackChannel: undefined,
  canUnauthRead: false,
  isPrivate: false,
  reports: List([]),
  createAt: undefined,
  updateAt: undefined,
};

export default class KnowledgeInfo extends Record(defaultValue) {
  clone(props = {}) {
    return Object.entries(props)
      .reduce((tempResult, [key, value]) => tempResult.set(key, value), this);
  }
}

