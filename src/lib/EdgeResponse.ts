export enum EEdgeStatus {
  Red,
  Yellow,
  Green,
  Blue
}

export interface TNodeResponseMessage {
  description: string;
}

export interface TEdgeResponse {
  status: EEdgeStatus;
  messages: TNodeResponseMessage[];
}
