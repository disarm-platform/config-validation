import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";

export function irs_record_point_fields_helper(config: TConfig) : TCustomEdgeResponses {
  // TODO: check this approach. 
  // irs_record_point relies on fields_helper which relies on form
  // so this check shouldn't be necessary
  // simpler would be to not have this edge, but rather irs_record_point_form

  if (!config.form) {
    return [{
      message: "Form is missing. Required by irs_record_point",
      status: ECustomEdgeStatus.Red
    }]  
  }
  
  return [{
    message: "Form, required by irs_record_point, is available.",
    status: ECustomEdgeStatus.Green
  }]
}