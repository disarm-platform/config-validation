export interface Validation {
  name: string;
  expression: string;
  message: string;
  type: string;
  precondition?: string;
}

export type Validations = Validation[]