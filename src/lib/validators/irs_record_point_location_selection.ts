import { Config } from "../../definitions";
import { EdgeStatus, TEdgeResponse } from "../EdgeResponse";


export function irs_record_point_location_selection(config: Config) : TEdgeResponse {
  if (!config.applets.irs_record_point) {
    return {
      messages: [],
      status: EdgeStatus.Blue
    }
  }

  if (!config.location_selection || Object.keys(config.location_selection).length === 0) {
    return {
      messages: [{description: 'Location selection missing, is required for irs_record_point.'}],
      status: EdgeStatus.Yellow
    }
  }

  return {
    messages: [],
    status: EdgeStatus.Green
  }
}