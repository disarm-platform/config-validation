import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";


export function spatial_hierarchy_geodata_levels(_config: TConfig): TCustomEdgeResponses {
  // TODO: write custom edge validator for spatial_hierarchy_geodata_levels
  // ensure all the spatial_hierarchy.markers exist on the levels
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}