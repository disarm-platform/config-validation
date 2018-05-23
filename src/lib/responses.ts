export enum EStatus {
  Green,
  Yellow,
  Red,
  Blue
}

export interface TMessage {
  description: string;
}

export interface TNodeResponse {
  status: EStatus;
  messages: TMessage[];
}

export interface TUnifiedResponse {
  status: EStatus;
  messages: TMessage[];
}
