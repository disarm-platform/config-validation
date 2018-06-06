/**
 * Red: The given config file is invalid, and cannot be saved/used for an application.
 * Green: The given config file is valid, and can be used.
 */
export enum EUnifiedStatus {
  Red = 'Red',
  Green = 'Green'
}

export interface TUnifiedResponse {
  status: EUnifiedStatus;
  message: string;
  support_messages?: string[]
}
