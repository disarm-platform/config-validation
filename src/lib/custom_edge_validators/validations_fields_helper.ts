import { TConfig } from "../../definitions/TConfig";
import { EEdgeStatus, TEdgeResponse } from "../EdgeResponse";
import { get_form_fields_for_validations } from "../helpers/expression_helpers";
import { get_form_fields } from "../helpers/form_helpers";

// checks that irs_record_point has the validations that it needs. 
// The function is named accordingly.
export function validations_fields_helper(config: TConfig): TEdgeResponse {
  if (!config.validations) return {
    messages: ['Missing validations - could be Blue too'],
    status: EEdgeStatus.Red
  }

  if (!config.form) return {
    messages: ['Missing Form - could be Blue too'],
    status: EEdgeStatus.Red
  }

  if (!config.validations.length) {
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }

  const formFields: string[] = get_form_fields(config.form)
  const validationFields: string[] = get_form_fields_for_validations(config.validations)

  for (const field of validationFields) {
    if (!formFields.includes(field)) {
      return {
        messages: [`'${field}' not in form fields` ],
        status: EEdgeStatus.Yellow
      }
    }
  }

  return {
    messages: [],
    status: EEdgeStatus.Green
  }
}