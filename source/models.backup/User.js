// @no-flow

import { Record, List } from 'immutable';

const defaultValue = {
  id: undefined,
  userName: undefined,
  displayName: undefined,
  email: undefined,
  passwordHash: undefined,
  role: undefined,
  groups: List([]),
  ownerKnowledges: List([]),
  editorKnowledges: List([]),
  createAt: undefined,
  updateAt: undefined,
};

export default class User extends Record(defaultValue) {
  // eslint-disable-next-line max-len
  clone({ id, userName, displayName, email, passwordHash, role, groups, ownerKnowledges, editorKnowledges, createAt, updateAt } = {}) {
    let result = this;

    if (id) {
      result = result.set('id', id);
    }

    if (userName) {
      result = result.set('userName', userName);
    }

    if (displayName) {
      result = result.set('displayName', displayName);
    }

    if (email) {
      result = result.set('email', email);
    }

    if (passwordHash) {
      result = result.set('passwordHash', passwordHash);
    }

    if (role) {
      result = result.set('role', role);
    }

    if (groups) {
      result = result.set('groups', groups);
    }

    if (ownerKnowledges) {
      result = result.set('ownerKnowledges', ownerKnowledges);
    }

    if (editorKnowledges) {
      result = result.set('editorKnowledges', editorKnowledges);
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
