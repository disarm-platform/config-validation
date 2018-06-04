/**
 * Red: The given config file is invalid, and cannot be saved/used for an application.
 * Green: The given config file is valid, and can be used.
 */
export enum EUnifiedStatus {
  Red = 'Red',
  Green = 'Green'
}

/**
 * `messages` - TODO: should be more detailed than just a bunch of strings, e.g. exact location where message comes from?
 */
export interface TUnifiedResponse {
  status: EUnifiedStatus;
  messages: string[];
}
