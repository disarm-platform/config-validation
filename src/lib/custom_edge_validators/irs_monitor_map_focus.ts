import { ECustomEdgeStatus, TCustomEdgeResponse } from "../TCustomEdgeResponse";

export function irs_monitor_map_focus(): TCustomEdgeResponse {
  // Nothing to check. Schema validity and existence of nodes should already have been confirmed
  return {
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }
}
