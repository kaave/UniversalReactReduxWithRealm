import actionCreatorFactory from 'typescript-fsa';

import { UserSummaryEntity } from '../entities/userSummary';

const actionCreator = actionCreatorFactory();

export type Types = 'USER_INIT_SUMMARIES' |
  'USER_GET_SUMMARIES_START' |
  'USER_GET_SUMMARIES_DONE' |
  'USER_GET_SUMMARIES_FAIL';

export const types = Object.freeze({
  initSummaries: 'USER_INIT_SUMMARIES',
  getSummariesStart: 'USER_GET_SUMMARIES_START',
  getSummariesDone: 'USER_GET_SUMMARIES_DONE',
  getSummariesFail: 'USER_GET_SUMMARIES_FAIL',
} as { [key: string]: Types });

export const initSummaries = actionCreator<void>(types.summariesInit);
export const getSummariesStart = actionCreator<void>(types.getSummariesStart);
export const getSummariesDone = actionCreator<UserSummaryEntity[]>(types.getSummariesDone);
export const getSummariesFail = actionCreator<void>(types.getSummariesFail);

export const actions = {
  initSummaries,
  getSummariesStart,
  getSummariesDone,
  getSummariesFail,
};
