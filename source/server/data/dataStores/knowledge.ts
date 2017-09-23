import realm from '../../databases/factory';
import * as KnowledgeInfo from '../../databases/schemas/knowledgeInfo';
import { KnowledgeSummaryEntity } from '../../../entities/knowledgeSummary';
import { Query } from '../repositories/knowledge';

function getSummaryObject({ category: categoryParam, user: userParam }: Query) {
  let knowledgeInfo = realm.objects<KnowledgeInfo.Types>(KnowledgeInfo.name)
    .map(knowledge => knowledge);

  if (categoryParam) {
    // TODO: 孫はqueryに含められない？
    // return knowledgeInfoObject.filtered('category.path = $0', category);
    knowledgeInfo = knowledgeInfo.filter(({ category }) => (
      category && category[0] && category[0].path.match(new RegExp(`^${categoryParam.replace(/^\//, '')}`))
    ));
  }

  if (userParam) {
    knowledgeInfo = knowledgeInfo.filter(({ category }) => (
      category && category[0] && category[0].path.match(new RegExp(`^${userParam.replace(/^\//, '')}`))
    ));
  }

  return knowledgeInfo;
}

export function getSummaries(query: Query = {}) {
  const knowledgeInfoObject = getSummaryObject(query);
  return knowledgeInfoObject.map(({ id, owner, title, tags, category, reports, updateAt }) => ({
    id,
    title,
    category: category && category[0] ? category[0].path : '',
    tags: tags ? tags.map(({ name }) => name) : [],
    userId: owner && owner[0] ? owner[0].id : '',
    userName: owner && owner[0] ? owner[0].displayName : '',
    type: reports && reports.length > 1 ? 'update' : 'create',
    eventAt: updateAt,
  } as KnowledgeSummaryEntity));
}
