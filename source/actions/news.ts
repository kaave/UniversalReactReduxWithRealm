import actionCreatorFactory from 'typescript-fsa';

import * as KnowledgeReport from '../server/databases/schemas/knowledgeReport';

const actionCreator = actionCreatorFactory();

export type Types = 'NEWS_INIT' |
  'NEWS_GET_START' |
  'NEWS_GET_DONE' |
  'NEWS_GET_FAIL';

export const types = Object.freeze({
  init: 'NEWS_INIT',
  getStart: 'NEWS_GET_START',
  getDone: 'NEWS_GET_DONE',
  getFail: 'NEWS_GET_FAIL',
} as { [key: string]: Types });

export const init = actionCreator<void>(types.init);
export const getStart = actionCreator<void>(types.getStart);
export const getDone = actionCreator<KnowledgeReport.Types[]>(types.getDone);
export const getFail = actionCreator<void>(types.getFail);

export const actions = {
  init,
  getStart,
  getDone,
  getFail,
};
