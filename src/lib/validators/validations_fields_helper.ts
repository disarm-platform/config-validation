import { Config } from "../../definitions";
import { EdgeStatus, TEdgeResponse } from "../EdgeResponse";
import { get_form_fields_for_validations } from "../helper_functions/expression_helpers";
import { get_form_fields } from "../helper_functions/form_helpers";

// checks that irs_record_point has the validations that it needs. 
// The function is named accordingly.
export function validations_fields_helper(config: Config): TEdgeResponse {

  if (!config.validations.length) {
    return {
      messages: [],
      status: EdgeStatus.Blue
    }
  }

  const formFields: string[] = get_form_fields(config.form)
  const validationFields: string[] = get_form_fields_for_validations(config.validations)

  for (const field of validationFields) {
    if (!formFields.includes(field)) {
      return {
        messages: [{ description: `'${field}' not in form fields` }],
        status: EdgeStatus.Yellow
      }
    }
  }

  return {
    messages: [],
    status: EdgeStatus.Green
  }
}