import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";


export function location_selection_spatial_hierarchy(_config: TConfig) : TCustomEdgeResponses {
  // TODO: write custom edge validator for location_selection_spatial_hierarchy
  // need to check the fields on location_selection exist. 
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}