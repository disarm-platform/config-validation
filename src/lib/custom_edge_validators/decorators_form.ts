import { TConfig } from "../../definitions/TConfig";
import { EEdgeStatus, TEdgeResponse } from "../TEdgeResponse";
import { expression_variables } from "../helpers";
import { form_fields } from "../helpers";


export function decorators_form(config: TConfig) : TEdgeResponse {
  if (!config.decorators) {
    return {
      messages: ['Could be BLue'],
      status: EEdgeStatus.Red
    }
  }

  if (!config.form) {
    return {
      messages: ['Could be BLue'],
      status: EEdgeStatus.Red
    }
  }

  if (!Object.keys(config.decorators).length) {
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }  
  }

  const formFields = form_fields(config.form)

  const decoratorNames = Object.keys(config.decorators)

  for (const decoratorName of decoratorNames) {
    const decorator = config.decorators[decoratorName]

    for (const decoratorPart of decorator) {
      const possibleFieldName = Object.keys(decoratorPart)[0]
      const expression = decoratorPart[possibleFieldName]
      const variables = expression_variables(expression)

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