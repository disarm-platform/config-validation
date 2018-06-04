export enum EEdgeStatus {
  Red = 'Red - fails internal validation',
  Yellow = 'Yellow - failes external validation',
  Green = 'Green - passed internal validation',
  Blue = 'Blue - node not required'
}
export interface TEdgeResponse {
  status: EEdgeStatus;
  messages: string[];
}
