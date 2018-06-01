export enum EUnifiedStatus {
  Red = 'Red',
  Green = 'Green'
}

export interface TUnifiedResponse {
  status: EUnifiedStatus;
  messages: string[];
}
