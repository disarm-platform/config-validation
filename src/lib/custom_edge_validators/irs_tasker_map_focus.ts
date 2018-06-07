import { ECustomEdgeStatus, TCustomEdgeResponses } from '../TCustomEdgeResponse';

export function irs_tasker_map_focus(): TCustomEdgeResponses {
  // Nothing to check. Schema validity and existence of nodes should already have been confirmed
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }];
}
