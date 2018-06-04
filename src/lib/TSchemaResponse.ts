/**
 * Red: Failed schema validation
 * Green: Passed schema validation
 */
export enum ESchemaStatus {
  Green = 'Green',
  Red = 'Red'
}

export interface TSchemaResponse {
  status: ESchemaStatus,
  errors: string;
}

