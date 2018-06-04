export enum EStandardEdgeStatus {
  Red = 'Red, fails node validation',
  Yellow = 'Yellow, fails edge validation',
  Green = 'Green, passed node and edge validation',
  Blue = 'Blue, not run, node or edge not required'
}

export interface TStandardEdgeResponse {
  status: EStandardEdgeStatus;
  messages: string[];
}
