import { TValidations } from '../config_types/TValidations';
import { THelpers } from '../helper_functions/create_helper_objects';
import { get_form_fields_for_validations } from '../helper_functions/expression_helpers';
import { ECustomEdgeStatus, TCustomEdgeResponses,  } from '../TCustomEdgeResponse';

export function validations_fields_helper(validations_config: TValidations, _ignore: object, helpers: THelpers): TCustomEdgeResponses {
  const available_fields = helpers.all_fields
  const fields_in_validations = get_form_fields_for_validations(validations_config)
  
  return fields_in_validations.map(field => {
    if (available_fields.includes(field)) {
      return {
        message: `${field} required and found`,
        status: ECustomEdgeStatus.Green
      }
    } else {
      return {
        message: `${field} required and NOT found`,
        status: ECustomEdgeStatus.Red
      }
    }
  })
}
