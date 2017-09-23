import * as DataStore from '../dataStores/knowledge';

export interface Query {
  category?: string;
  user?: string;
}

export function getSummaries(query?: Query) {
  return DataStore.getSummaries(query);
}
