import * as Realm from 'realm';
import * as shortid from 'shortid';

import realm from '../factory';
import * as User from '../schemas/user';
import * as KnowledgeInfo from '../schemas/knowledgeInfo';
import * as KnowledgeReport from '../schemas/knowledgeReport';
import * as Log from '../schemas/log';

function userLog(collection: Realm.Collection<User.Types>, change: Realm.CollectionChangeSet) {
  change.insertions.forEach((value, index, array) => {
    console.log('insertions user', value, index, array);
    const insertedUser = collection[value];

    // TODO: check transaction status
    realm.create<Log.Types>(Log.name, {
      id: shortid.generate(),
      case: 'newUser',
      userId: insertedUser.id,
      userName: insertedUser.userName,
    });
  });

  change.modifications.forEach((value, index, array) => {
    console.log('modifications user', value, index, array);
  });

  change.deletions.forEach((value, index, array) => {
    console.log('deletions user', value, index, array);
  });
}

function knowledgeInfoLog(collection: Realm.Collection<KnowledgeInfo.Types>, change: Realm.CollectionChangeSet) {
  change.insertions.forEach((value, index, array) => {
    console.log('insertions knowledgeInfo', value, index, array);
    const insertedKnowledgeInfo = collection[value];
    if (!insertedKnowledgeInfo) {
      return;
    }
    const owner = insertedKnowledgeInfo.owner[0];
    if (!owner) {
      return;
    }

    realm.write(() => realm.create<Log.Types>(Log.name, {
      id: shortid.generate(),
      case: 'createKnowledge',
      userId: owner.id,
      userName: owner.userName,
      knowledgeInfoId: insertedKnowledgeInfo.id,
      knowledgeInfoName: insertedKnowledgeInfo.title,
    }));
  });

  change.modifications.forEach((value, index, array) => {
    console.log('modifications knowledgeInfo', value, index, array);
  });
}

function knowledgeReportLog(collection: Realm.Collection<KnowledgeReport.Types>, change: Realm.CollectionChangeSet) {
  change.insertions.forEach((value, index, array) => {
    console.log('insertions knowledgeReport', value, index, array);
    const insertedKnowledgeReport = collection[value];
    if (!insertedKnowledgeReport || !insertedKnowledgeReport.info) {
      console.log('invalid info');
      return;
    }
    const insertedKnowledgeInfo = insertedKnowledgeReport.info[0];

    if (!insertedKnowledgeInfo.reports || !insertedKnowledgeInfo.reports[0]) {
      console.log('invalid reports', insertedKnowledgeInfo.reports);
      return;
    }

    if (insertedKnowledgeInfo.reports[0].id === insertedKnowledgeReport.id) {
      // first report: already wrote log on create info
      return;
    }

    const owner = insertedKnowledgeInfo.owner[0];
    if (!owner) {
      console.log('invalid owner', owner);
      return;
    }

    // TODO: check transaction status
    realm.write(() => realm.create<Log.Types>(Log.name, {
      id: shortid.generate(),
      case: 'updateKnowledge',
      userId: owner.id,
      userName: owner.userName,
      knowledgeInfoId: insertedKnowledgeInfo.id,
      knowledgeInfoName: insertedKnowledgeInfo.title,
    }));
  });

  change.modifications.forEach((value, index, array) => {
    console.log('modifications knowledgeInfo', value, index, array);
  });
}

export default function set(realmInstance: Realm) {
  realmInstance.objects<User.Types>(User.name).addListener(userLog);
  realmInstance.objects<KnowledgeInfo.Types>(KnowledgeInfo.name).addListener(knowledgeInfoLog);
  realmInstance.objects<KnowledgeReport.Types>(KnowledgeReport.name).addListener(knowledgeReportLog);
}
