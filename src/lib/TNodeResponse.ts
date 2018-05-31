export enum ENodeResponseStatus {
  Green = 'Green',
  Red = 'Red'
}

export interface TNodeResponse {
  status: ENodeResponseStatus,
  messages: string[]
}