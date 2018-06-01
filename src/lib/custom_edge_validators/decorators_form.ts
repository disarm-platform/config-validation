import { TConfig } from "../../definitions/TConfig";
import { EEdgeStatus, TEdgeResponse } from "../EdgeResponse";
import { get_expresion_variables } from "../helpers/expression_helpers";
import { get_form_fields } from "../helpers/form_helpers";


export function decorators_form(config: TConfig) : TEdgeResponse {
  if (!Object.keys(config.decorators).length) {
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }  
  }

  const formFields = get_form_fields(config.form)

  const decoratorNames = Object.keys(config.decorators)

  for (const decoratorName of decoratorNames) {
    const decorator = config.decorators[decoratorName]

    for (const decoratorPart of decorator) {
      const possibleFieldName = Object.keys(decoratorPart)[0]
      const expression = decoratorPart[possibleFieldName]
      const variables = get_expresion_variables(expression)

      for (const variable of variables) {
        if (!formFields.includes(variable)) {
          return {
            messages: [`Field '${variable}' in decorator '${decoratorName}' does not exist on form`],
            status: EEdgeStatus.Yellow
          }
        }
      }
    }
  }

  // ensure fields from decorators exist on form

  return {
    messages: [],
    status: EEdgeStatus.Green
  }
}