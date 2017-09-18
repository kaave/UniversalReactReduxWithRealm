export interface UserSummaryEntity {
  id: string;
  userName: string;
  displayName: string;
  email: string;
  role: string;
  groups: string[];
  ownerKnowledgeIds: string[];
  editorKnowledgeIds: string[];
  createAt?: Date;
}
