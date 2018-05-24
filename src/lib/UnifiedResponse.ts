export enum EUnifiedStatus {
  Red,
  Green
}

export interface TUnifiedResponseMessage {
  description: string;
}

export interface TUnifiedResponse {
  status: EUnifiedStatus;
  messages: TUnifiedResponseMessage[];
}
