import { TConfig } from '../config_types/TConfig';
import { form_fields, get_form_fields_for_validations } from '../helpers';
import { ECustomEdgeStatus, TCustomEdgeResponse } from '../TCustomEdgeResponse';

// checks that irs_record_point has the validations that it needs.
export function validations_fields_helper(config: TConfig): TCustomEdgeResponse {
  let messages: string[] = [];
  let status = ECustomEdgeStatus.Red;

  const available_form_fields: string[] = form_fields(config.form);
  const validationFields: string[] = get_form_fields_for_validations(config.validations);

  for (const field of validationFields) {
    if (!available_form_fields.includes(field)) {
      return {
        messages: [`'${field}' not in form fields`],
        status: ECustomEdgeStatus.Yellow
      };
    }
  }

  return {
    messages, status
  };
}
