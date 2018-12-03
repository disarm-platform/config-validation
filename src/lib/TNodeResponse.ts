export enum ENodeResponseStatus {
  Green = 'Green, both required nodes exist',
  Red = 'Red, one or both nodes missing'
}

export interface TNodeResponse {
  status: ENodeResponseStatus;
  message: string;
}
