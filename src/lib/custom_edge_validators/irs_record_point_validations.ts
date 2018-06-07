import { TIrsRecordPoint } from "../config_types/TIrsRecordPoint";
import { TValidations } from "../config_types/TValidations";
import { THelpers } from "../helper_functions/create_helper_objects";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";

export function irs_record_point_validations(_irs_record_config: TIrsRecordPoint, _validations: TValidations, _helpers: THelpers) : TCustomEdgeResponses {
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}
