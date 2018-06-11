import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";


export function aggregations_spatial_hierarchy(_config: TConfig): TCustomEdgeResponses {
  // TODO: write custom edge validator for aggregations_spatial_hierarchy
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}