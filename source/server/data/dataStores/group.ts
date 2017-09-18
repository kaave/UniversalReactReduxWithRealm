import realm from '../../databases/factory';
import * as Group from '../../databases/schemas/group';
import { GroupEntity } from '../../../entities/group';

export function get() {
  return realm.objects<Group.Types>(Group.name)
    .map(({ name, desc, users, readKnowledges, editKnowledges, createAt, updateAt }) => ({
      name,
      desc,
      userIds: users ? users.map(({ id }) => id) : [],
      readKnowledgeIds: readKnowledges ? readKnowledges.map(({ id }) => id) : [],
      editKnowledgeIds: editKnowledges ? editKnowledges.map(({ id }) => id) : [],
    } as GroupEntity),
  );
}
