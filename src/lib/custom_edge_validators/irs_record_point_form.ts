import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";

export function irs_record_point_form(_config: TConfig) : TCustomEdgeResponses {
  // TODO: check this approach. 
  // irs_record_point relies on fields_helper which relies on form
  // so this check shouldn't be necessary
  // simpler would be to not have this edge, but rather irs_record_point_form
  
  return [{
    message: "Form, required by irs_record_point, is available.",
    status: ECustomEdgeStatus.Green
  }]
}