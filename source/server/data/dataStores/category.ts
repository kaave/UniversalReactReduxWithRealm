import realm from '../../databases/factory';
import * as Category from '../../databases/schemas/category';
import { CategoryEntity } from '../../../entities/category';

function parseEntity({ path, createAt, updateAt, knowledges }: Category.Types): CategoryEntity {
  return { path, createAt, updateAt, count: knowledges.length };
}

export function get() {
  return realm.objects<Category.Types>(Category.name)
    .map(parseEntity);
}
