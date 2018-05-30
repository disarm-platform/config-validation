import { Config } from "../../definitions";
import { EdgeStatus, TEdgeResponse } from "../EdgeResponse";


export function irs_monitor_map_focus(config: Config): TEdgeResponse {
  if (!config.applets.irs_monitor) {
    return {
      messages: [],
      status: EdgeStatus.Blue
    }
  }

  if (!config.map_focus) {
    return {
      messages: [],
      status: EdgeStatus.Blue
    }
  }

  return {
    messages: [],
    status: EdgeStatus.Green
  }
}