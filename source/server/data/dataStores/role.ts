import realm from '../../databases/factory';
import * as Role from '../../databases/schemas/role';
import { RoleEntity } from '../../../entities/role';

export function get() {
  return realm.objects<Role.Types>(Role.name)
    .map(({ key, users }) => ({
      key,
      userIds: users.map(({ id }) => id),
    } as RoleEntity),
  );
}
