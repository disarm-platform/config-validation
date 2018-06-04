import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponse } from "../TCustomEdgeResponse";


export function irs_monitor_map_focus(config: TConfig): TCustomEdgeResponse {
  if (!config.applets.irs_monitor) {
    return {
      messages: [],
      status: ECustomEdgeStatus.Blue
    }
  }

  if (!config.map_focus) {
    return {
      messages: [],
      status: ECustomEdgeStatus.Blue
    }
  }

  return {
    messages: [],
    status: ECustomEdgeStatus.Green
  }
}
