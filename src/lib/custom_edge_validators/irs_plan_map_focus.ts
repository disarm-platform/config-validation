import { TIrsPlan } from "../config_types/TIrsPlan";
import { TMapFocus } from "../config_types/TMapFocus";
import { THelpers } from "../helper_functions/create_helper_objects";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";


export function irs_plan_map_focus(_irs_plan_config: TIrsPlan, _map_focus_config: TMapFocus, _helpers: THelpers): TCustomEdgeResponses {
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }];
}