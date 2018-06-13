import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";

export function irs_monitor_map_focus(_config: TConfig): TCustomEdgeResponses {
  // Nothing to check. Schema validity and existence of nodes should already have been confirmed
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}
