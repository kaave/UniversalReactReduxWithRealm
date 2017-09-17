import realm from '../../databases/factory';
import * as Tag from '../../databases/schemas/tag';
import { TagEntity } from '../../../entities/tag';

function parseEntity({ name, knowledges }: Tag.Types): TagEntity {
  return { name, count: knowledges ? knowledges.length : 0 };
}

export function get() {
  return realm.objects<Tag.Types>(Tag.name)
    .map(parseEntity);
}
