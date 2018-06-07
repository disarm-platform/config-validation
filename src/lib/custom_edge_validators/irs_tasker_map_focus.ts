import { TIrsTasker } from '../config_types/TIrsTasker';
import { TMapFocus } from '../config_types/TMapFocus';
import { THelpers } from '../helper_functions/create_helper_objects';
import { ECustomEdgeStatus, TCustomEdgeResponses } from '../TCustomEdgeResponse';

export function irs_tasker_map_focus(_irs_tasker_config: TIrsTasker, _map_focus_config: TMapFocus, _helpers: THelpers): TCustomEdgeResponses {
  // Nothing to check. Schema validity and existence of nodes should already have been confirmed
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }];
}
