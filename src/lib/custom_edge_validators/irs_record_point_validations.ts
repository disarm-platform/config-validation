import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";
import { TConfig } from "../config_types/TConfig";

export function irs_record_point_validations(_config: TConfig) : TCustomEdgeResponses {
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}
