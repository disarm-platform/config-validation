import { TConfig } from "../src/lib/config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponse } from "../src/lib/TCustomEdgeResponse";


export function irs_record_point_location_selection(config: TConfig) : TCustomEdgeResponse {
  if (!config.applets.irs_record_point) {
    return {
      messages: [],
      status: ECustomEdgeStatus.Blue
    }
  }

  if (!config.location_selection || Object.keys(config.location_selection).length === 0) {
    return {
      messages: ['Location selection missing, is required for irs_record_point.'],
      status: ECustomEdgeStatus.Yellow
    }
  }

  return {
    messages: [],
    status: ECustomEdgeStatus.Green
  }
}
