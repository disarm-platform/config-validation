export enum ENodeStatus {
  Red,
  Yellow,
  Green,
  Blue
}

export interface TNodeResponseMessage {
  description: string;
}

export interface TNodeResponse {
  status: ENodeStatus;
  messages: TNodeResponseMessage[];
}
