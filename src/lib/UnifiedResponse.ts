export enum UnifiedStatus {
  Red = 'Red',
  Green = 'Green'
}

export interface UnifiedResponseMessage {
  description: string;
}

export interface UnifiedResponse {
  status: UnifiedStatus;
  messages: UnifiedResponseMessage[];
}
