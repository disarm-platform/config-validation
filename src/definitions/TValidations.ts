export interface TValidation {
  name: string;
  expression: string;
  message: string;
  type: string;
  precondition?: string;
}

export type TValidations = TValidation[]