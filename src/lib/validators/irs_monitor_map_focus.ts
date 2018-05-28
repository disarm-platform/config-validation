import { Config } from "../../definitions";
import { EEdgeStatus, TEdgeResponse } from "../EdgeResponse";


export function irs_monitor_map_focus(config: Config): TEdgeResponse {
  if (!config.applets.irs_monitor) {
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }

  if (!config.map_focus) {
    return {
      messages: [],
      status: EEdgeStatus.Blue
    }
  }

  return {
    messages: [],
    status: EEdgeStatus.Green
  }
}