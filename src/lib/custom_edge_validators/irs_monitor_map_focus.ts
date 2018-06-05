import { TConfig } from "../config_types/TConfig";
import { TIrsMonitor } from "../config_types/TIrsMonitor";
import { TMapFocus } from "../config_types/TMapFocus";
import { ECustomEdgeStatus, TCustomEdgeResponse } from "../TCustomEdgeResponse";

export function irs_monitor_map_focus(irs_monitor_config: TIrsMonitor, map_focus_config: TMapFocus): TCustomEdgeResponse {
  // Nothing to check. Schema validity and existence of nodes should already have been confirmed
  return {
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }
}
