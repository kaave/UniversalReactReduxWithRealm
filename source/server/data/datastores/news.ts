import realm from '../../databases/factory';
import * as knowledgeReport from '../../databases/schemas/knowledgeReport';
import * as Rx from 'rxjs';

function parseEntity(report: knowledgeReport.Types) {
  return {
    id: report.id,
    eventAt: report.createAt,

  // id: string;
  // info?: KnowledgeInfo;
  // editor?: User;
  // source: string;
  // createAt: Date;
  // updateAt: Date;
  };
}

function load(pageNo: number = 1) {
  if (pageNo < 1) {
    throw new Error(`Invalid PageNo: ${pageNo}. pageNo MUST larger than 1`);
  } else if (parseInt(pageNo.toString(), 10) !== pageNo) {
    throw new Error(`Invalid PageNo: ${pageNo}. pageNo type needs integer.`);
  }

  const pageLength = 20;
  const offsets = pageLength * (pageNo - 1);
  const knowledgeReports = Array.from(realm.objects<knowledgeReport.Types>(knowledgeReport.name)
    .sorted('createAt', true)
    .slice(offsets, pageLength));
}

