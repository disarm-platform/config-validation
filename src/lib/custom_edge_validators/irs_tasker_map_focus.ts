import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponse } from "../TCustomEdgeResponse";
import { TMapFocus } from '../config_types/TMapFocus';
import { TIrsTasker } from '../config_types/TIrsTasker';



export function irs_tasker_map_focus (irs_tasker_config: TIrsTasker, map_focus_config: TMapFocus) : TCustomEdgeResponse {
  // Nothing to check. Schema validity and existence of nodes should already have been confirmed
  return {
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }
}
