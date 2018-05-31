import { TConfig } from "../../definitions/TConfig";
import { EEdgeStatus, TEdgeResponse } from "../EdgeResponse";


export function irs_record_point_location_selection(config: TConfig) : TEdgeResponse {
  if (!config.applets.irs_record_point) {
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }

  if (!config.location_selection || Object.keys(config.location_selection).length === 0) {
    return {
      messages: [{description: 'Location selection missing, is required for irs_record_point.'}],
      status: EEdgeStatus.Yellow
    }
  }

  return {
    messages: [],
    status: EEdgeStatus.Green
  }
}