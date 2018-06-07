import { TIrsRecordPoint } from "../config_types/TIrsRecordPoint";
import { TValidations } from "../config_types/TValidations";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";

export function irs_record_point_validations(_irs_record_config: TIrsRecordPoint, _validations: TValidations) : TCustomEdgeResponses {
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}
