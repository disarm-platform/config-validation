import { ECustomEdgeStatus, TCustomEdgeResponses } from '../TCustomEdgeResponse';
import { TConfig } from '../config_types/TConfig';

export function irs_tasker_map_focus(_config: TConfig): TCustomEdgeResponses {
  // Nothing to check. Schema validity and existence of nodes should already have been confirmed
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }];
}
