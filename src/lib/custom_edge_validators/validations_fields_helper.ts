import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponse } from "../TCustomEdgeResponse";
import { get_form_fields_for_validations } from "../helpers/expression_helpers";
import { form_fields } from "../helpers";

// checks that irs_record_point has the validations that it needs.
// The function is named accordingly.
export function validations_fields_helper(config: TConfig): TCustomEdgeResponse {
  if (!config.validations) return {
    messages: ['Missing validations - could be Blue too'],
    status: ECustomEdgeStatus.Red
  }

  if (!config.form) return {
    messages: ['Missing Form - could be Blue too'],
    status: ECustomEdgeStatus.Red
  }

  if (!config.validations.length) {
    return {
      messages: [],
      status: ECustomEdgeStatus.Blue
    }
  }

  const formFields: string[] = form_fields(config.form)
  const validationFields: string[] = get_form_fields_for_validations(config.validations)

  for (const field of validationFields) {
    if (!formFields.includes(field)) {
      return {
        messages: [`'${field}' not in form fields` ],
        status: ECustomEdgeStatus.Yellow
      }
    }
  }

  return {
    messages: [],
    status: ECustomEdgeStatus.Green
  }
}
