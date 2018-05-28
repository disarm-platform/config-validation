import { Config } from "../../definitions";
import { EEdgeStatus, TEdgeResponse } from "../EdgeResponse";
import { get_form_fields_for_validations } from "../helpers/expression_helpers";
import { get_form_fields } from "../helpers/form_helpers";

// checks that irs_record_point has the validations that it needs. 
// The function is named accordingly.
export function irs_record_point_validations(config: Config) : TEdgeResponse {
  /**
   * 1. Check the pieces we require for this validations exist.
   *    If they don't return Blue
   */

  if (!config.applets.irs_record_point) {
    // if irs_record_point does not exist, then we don't want to run the rest of the validations
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }

  // irs_record_point doesn't require validations, but will use them if they exists. 
  if (config.validations && !config.validations.length) {
    // so if none, the config is valid, but not "Green" valid
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }

  /**
   * 2. Run the custom validation logic for this function
   *    Return Yellow if not passing.
   */


  const formFields: string[] = get_form_fields(config.form)
  const validationFields: string[] = get_form_fields_for_validations(config.validations)

  for (const field of validationFields) {
    if (!formFields.includes(field)) {
      return {
        messages: [{description: `'${field}' not in form fields`}],
        status: EEdgeStatus.Yellow
      }
    }
  }


  /**
   * 3. Return success
   *    Return Green.
   */
  return {
    messages: [],
    status: EEdgeStatus.Green
  }
}