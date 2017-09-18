import realm from '../../databases/factory';
import * as User from '../../databases/schemas/user';
import { UserSummaryEntity } from '../../../entities/userSummary';

export function getAllUserSummarys() {
  return realm.objects<User.Types>(User.name)
    .map(({ id, userName, displayName, email, role, groups, ownerKnowledges, editorKnowledges, createAt }) => ({
      id,
      userName,
      displayName,
      email,
      role: role && role[0] ? role[0].key : '',
      groups: groups ? groups.map(({ name }) => name) : '',
      ownerKnowledgeIds: ownerKnowledges ? ownerKnowledges.map(({ id: knowledgeId }) => knowledgeId) : [],
      editorKnowledgeIds: editorKnowledges ? editorKnowledges.map(({ id: knowledgeId }) => knowledgeId) : [],
      createAt,
    } as UserSummaryEntity),
  );
}
