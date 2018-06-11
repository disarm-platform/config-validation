import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";


export function aggregations_spatial_hierarchy(_config: TConfig): TCustomEdgeResponses {
  // TODO: write custom edge validator for aggregations_spatial_hierarchy
  // Needs to ensure denominator_fields exist on spatial_hierarchy. Requires new spatial_hierarchy first.
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}