import {Parser} from 'expr-eval'
import { TValidation } from '../../definitions/TValidations';

export function get_expresion_variables(expressionString: string) : string[] {
  if (!expressionString.length) {
    return []
  }

  const expression = new Parser().parse(expressionString)
  return expression.variables()
}

export function get_form_fields_for_validations(validations: TValidation[]) : string[] {
  const fields = validations.reduce((acc: string[], validation: TValidation) => {
    return [...acc, ...get_expresion_variables(validation.expression)]
  }, [])
  return fields
}