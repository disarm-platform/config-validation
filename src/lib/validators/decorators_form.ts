import { Config } from "../../definitions";
import { EdgeStatus, TEdgeResponse } from "../EdgeResponse";
import { get_expresion_variables } from "../helper_functions/expression_helpers";
import { get_form_fields } from "../helper_functions/form_helpers";


export function decorators_form(config: Config) : TEdgeResponse {
  if (!Object.keys(config.decorators).length) {
    return {
      messages: [],
      status: EdgeStatus.Blue
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
            messages: [{description: `Field '${variable}' in decorator '${decoratorName}' does not exist on form`}],
            status: EdgeStatus.Yellow
          }
        }
      }
    }
  }

  // ensure fields from decorators exist on form

  return {
    messages: [],
    status: EdgeStatus.Green
  }
}