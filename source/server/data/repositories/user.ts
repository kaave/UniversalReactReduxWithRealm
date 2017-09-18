import * as DataStore from '../dataStores/user';

export function getAllUsersInfo() {
  return DataStore.getAllUserSummarys();
}
