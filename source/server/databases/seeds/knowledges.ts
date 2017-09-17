// @flow
import * as addMinutes from 'date-fns/add_minutes';
import * as shortid from 'shortid';

import realm from '../factory';
import * as user from '../schemas/user';
import * as knowledgeInfo from '../schemas/knowledgeInfo';
import * as knowledgeReport from '../schemas/knowledgeReport';
import * as tag from '../schemas/tag';
import * as group from '../schemas/group';
import { setCategoryToKnowledge } from './categories';

const dates = {
  today: new Date(),
  after30mins: addMinutes(new Date(), 30),
  after60mins: addMinutes(new Date(), 60),
};
export const knowledgeSeeds = [
  {
    id: shortid.generate(),
    title: '売上201709',
    notificationSlackChannel: 'general',
    canUnauthRead: false,
    isPrivate: false,
    createAt: dates.today,
    updateAt: dates.today,

    /* relationship rows */
    ownerName: 'owner',
    categoryPath: '社内資料/売上/2017',
    tagNames: ['社内資料', '2017'],
    readGroups: ['Manager', 'Engineer', 'Designer'],
    editGroups: ['Manager', 'Designer'],
    reportSeeds: [
      {
        id: shortid.generate(),
        source: '# Hello!\n\nversion 1',
        createAt: dates.today,
        updateAt: dates.today,
        /* relationship rows */
        editorName: 'owner',
      },
      {
        id: shortid.generate(),
        source: '# Hello!!\n\nversion 2',
        createAt: dates.after30mins,
        updateAt: dates.after30mins,
        /* relationship rows */
        editorName: 'owner',
      },
      {
        id: shortid.generate(),
        source: '# Hello!!!\n\nversion 3',
        createAt: dates.after60mins,
        updateAt: dates.after60mins,
        /* relationship rows */
        editorName: 'owner',
      },
    ],
  },
];

export default function() {
  knowledgeSeeds.forEach(seed => realm.write(() => {
    const knowledgeObject = realm.create<knowledgeInfo.Types>(knowledgeInfo.name, { ...seed,
      tags: seed.tagNames
        .map(tagName => realm.objects<tag.Types>(tag.name).filtered('name = $0', tagName)[0])
        .filter(tagObject => tagObject !== undefined),
      readGroups: seed.readGroups
        .map(groupName => realm.objects<group.Types>(group.name).filtered('name = $0', groupName)[0])
        .filter(groupObject => groupObject !== undefined),
      editGroups: seed.editGroups
        .map(groupName => realm.objects<group.Types>(group.name).filtered('name = $0', groupName)[0])
        .filter(groupObject => groupObject !== undefined),
    } as any);
    const userObject = realm.objects<user.Types>(user.name)
      .filtered('userName = $0', seed.ownerName)[0];
    if (userObject && userObject.ownerKnowledges) {
      userObject.ownerKnowledges.push(knowledgeObject);
    }
    setCategoryToKnowledge({
      object: knowledgeObject,
      path: seed.categoryPath,
    });

    // grow reports
    seed.reportSeeds.forEach(reportSeed => {
      const { id, source, createAt, updateAt } = reportSeed;
      const reportObject = realm.create<knowledgeReport.Types>(
        knowledgeReport.name,
        { id, source, createAt, updateAt },
      );
      const targetUserObject = realm.objects<user.Types>(user.name)
        .filtered('userName = $0', reportSeed.editorName)[0];

      if (targetUserObject && targetUserObject.editorKnowledges) {
        targetUserObject.editorKnowledges.push(reportObject);
      }

      if (knowledgeObject.reports) {
        knowledgeObject.reports.push(reportObject);
      }
    });
  }));
}
