import { TIrsMonitor } from "../config_types/TIrsMonitor";
import { TMapFocus } from "../config_types/TMapFocus";
import { THelpers } from "../helper_functions/create_helper_objects";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";

export function irs_monitor_map_focus(_irs_monitor_config: TIrsMonitor, _map_focus_config: TMapFocus, _helpers: THelpers): TCustomEdgeResponses {
  // Nothing to check. Schema validity and existence of nodes should already have been confirmed
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}
