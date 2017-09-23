type SummaryType = 'create' | 'update';

export interface KnowledgeSummaryEntity {
  id: string;
  title: string;
  category: string;
  tags: string[];
  userId: string;
  userName: string;
  type: SummaryType;
  eventAt: Date;
}
