import actionCreatorFactory from 'typescript-fsa';

import { KnowledgeSummaryEntity } from '../entities/knowledgeSummary';

const actionCreator = actionCreatorFactory();

export type Types = 'KNOWLEDGE_SUMMARIES_INIT' |
  'KNOWLEDGE_SUMMARIES_GET_START' |
  'KNOWLEDGE_SUMMARIES_GET_DONE' |
  'KNOWLEDGE_SUMMARIES_GET_FAIL';

export const types = Object.freeze({
  knowledgeSummariesInit: 'KNOWLEDGE_SUMMARIES_INIT',
  knowledgeSummariesGetStart: 'KNOWLEDGE_SUMMARIES_GET_START',
  knowledgeSummariesGetDone: 'KNOWLEDGE_SUMMARIES_GET_DONE',
  knowledgeSummariesGetFail: 'KNOWLEDGE_SUMMARIES_GET_FAIL',
} as { [key: string]: Types });

export const knowledgeSummariesInit = actionCreator<void>(types.knowledgeSummariesInit);
export const knowledgeSummariesGetStart = actionCreator<string>(types.knowledgeSummariesGetStart);
export const knowledgeSummariesGetDone = actionCreator<KnowledgeSummaryEntity[]>(types.knowledgeSummariesGetDone);
export const knowledgeSummariesGetFail = actionCreator<void>(types.knowledgeSummariesGetFail);

export const actions = {
  knowledgeSummariesInit,
  knowledgeSummariesGetStart,
  knowledgeSummariesGetDone,
  knowledgeSummariesGetFail,
};
