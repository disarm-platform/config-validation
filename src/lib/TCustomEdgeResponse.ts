export enum ECustomEdgeStatus {
  Red = 'Red, fails custom edge validation',
  Green = 'Green, passes edge validation'
}
export interface TCustomEdgeResponse {
  status: ECustomEdgeStatus;
  message: string;
}

export type TCustomEdgeResponses = TCustomEdgeResponse[];
