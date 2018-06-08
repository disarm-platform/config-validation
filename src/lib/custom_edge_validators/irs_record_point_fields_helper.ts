import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";

export function irs_record_point_fields_helper(config: TConfig) : TCustomEdgeResponses {
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