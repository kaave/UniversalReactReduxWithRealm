// @flow
import * as shortid from 'shortid';

import realm from '../factory';
import * as tag from '../schemas/tag';

export const tagSeeds = [
  '社内資料',
  'Wifi',
  '議事録',
  '2017',
  '案件資料',
  'A社',
];

export default function() {
  tagSeeds.forEach(name => realm.write(() => {
    realm.create<tag.Types>(tag.name, { name });
  }));
}
