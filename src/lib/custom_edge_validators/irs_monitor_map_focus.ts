import { TConfig } from "../config_types/TConfig";
import { EEdgeStatus, TEdgeResponse } from "../TEdgeResponse";


export function irs_monitor_map_focus(config: TConfig): TEdgeResponse {
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