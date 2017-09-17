import realm from '../factory';
import * as category from '../schemas/category';
import * as knowledgeInfo from '../schemas/knowledgeInfo';

export const categorySeeds = [
  '社内資料/Wifi',
  '社内資料/業務規程',
  '社内資料/売上/2016',
  '社内資料/売上/2017',
  '議事録/2017/09',
  '議事録/2017/10',
  'Report/2017/11',
  '案件資料/A社/a',
  '案件資料/B社/a/b/c',
];

export function setCategoryToKnowledge({ path, object }: { path: string, object: knowledgeInfo.Types }) {
  const targetCategory = realm.objects<category.Types>(category.name).filtered('path = $0', path)[0];
  if (targetCategory) {
    targetCategory.knowledges.push(object);
  }
}

export default function() {
  categorySeeds.forEach(path => realm.write(() => realm.create(category.name, { path })));
}
