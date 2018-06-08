import { TConfig } from "../config_types/TConfig";
import { create_helper_objects } from "../helper_functions";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";

export function decorators_form(config: TConfig): TCustomEdgeResponses {
  const helpers = create_helper_objects(config)

  const fields_in_decorators: string[] = helpers.fields_in_decorators
  const available_form_fields: string[] = helpers.form_fields

  return fields_in_decorators.map(form_field => {
    if (available_form_fields.includes(form_field)) {
      return {
        message: `Decorator ${form_field} is required and is available`,
        status: ECustomEdgeStatus.Green
      }
    } else {
      return {
        message: `Decorator ${form_field} is required but is not available`,
        status: ECustomEdgeStatus.Red
      }
    }
  })
}