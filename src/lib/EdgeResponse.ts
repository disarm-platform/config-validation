export enum EdgeStatus {
  Red = 'Red - fails internal validation',
  Yellow = 'Yellow - failes external validation',
  Green = 'Green - passed internal validation',
  Blue = 'Blue - node not required'
}

export interface NodeResponseMessage {
  description: string;
}

export interface TEdgeResponse {
  status: EdgeStatus;
  messages: NodeResponseMessage[];
}
