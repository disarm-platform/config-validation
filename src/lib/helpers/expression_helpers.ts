import {Parser} from 'expr-eval'
import { TValidation } from '../../config_types/TValidations';

export function expression_variables(expressionString: string) : string[] {
  if (!expressionString.length) {
    return []
  }

  const expression = new Parser().parse(expressionString)
  return expression.variables()
}

export function get_form_fields_for_validations(validations: TValidation[]) : string[] {
  return validations.reduce((acc: string[], validation: TValidation) => {
    return [...acc, ...expression_variables(validation.expression)]
  }, [])
}