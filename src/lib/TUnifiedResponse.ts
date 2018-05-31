export enum UnifiedStatus {
  Red = 'Red',
  Green = 'Green'
}

export interface TUnifiedResponse {
  status: UnifiedStatus;
  messages: string[];
}
