export enum EUnifiedStatus {
  Red = 'Red',
  Green = 'Green'
}

export interface TUnifiedResponseMessage {
  description: string;
}

export interface TUnifiedResponse {
  status: EUnifiedStatus;
  messages: TUnifiedResponseMessage[];
}
