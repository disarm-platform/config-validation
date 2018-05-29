import {Parser} from 'expr-eval'
import { Validation } from '../../definitions/validations';

export function get_expresion_variables(expressionString: string) : string[] {
  if (!expressionString.length) {
    return []
  }

  const expression = new Parser().parse(expressionString)
  return expression.variables()
}

export function get_form_fields_for_validations(validations: Validation[]) : string[] {
  const fields = validations.reduce((acc: string[], validation: Validation) => {
    return [...acc, ...get_expresion_variables(validation.expression)]
  }, [])
  return fields
}