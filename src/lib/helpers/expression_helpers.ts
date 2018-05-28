import {Parser} from 'expr-eval'
import { Validation } from '../../definitions/validations';

export function get_validation_variables(expressionString: string) : string[] {
  const expression = new Parser().parse(expressionString)
  return expression.variables()
}

export function get_form_fields_for_validations(validations: Validation[]) : string[] {
  const fields = validations.reduce((acc: string[], validation: Validation) => {
    return [...acc, ...get_validation_variables(validation.expression)]
  }, [])
  return fields
}