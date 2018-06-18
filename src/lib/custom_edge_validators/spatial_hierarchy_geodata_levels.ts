import { TConfig } from '../config_types/TConfig';
import { TSpatialHierarchy } from '../config_types/TSpatialHierarchy';
import {
  ECustomEdgeStatus,
  TCustomEdgeResponses
} from '../TCustomEdgeResponse';

export function spatial_hierarchy_geodata_levels(
  config: TConfig
): TCustomEdgeResponses {
  const spatial_hierarchy = config.spatial_hierarchy as TSpatialHierarchy;
  const planning_level_name = spatial_hierarchy.markers.planning_level_name;
  const record_location_selection_level_name =
    spatial_hierarchy.markers.record_location_selection_level_name;
  const level_names = spatial_hierarchy.levels.map(l => l.name);

  const responses: TCustomEdgeResponses = [];

  if (!level_names.includes(planning_level_name)) {
    responses.push({
      message: `planning_level_name (${planning_level_name}) missing from spatial_hierarchy.levels`,
      status: ECustomEdgeStatus.Red
    });
  }

  if (!level_names.includes(record_location_selection_level_name)) {
    responses.push({
      message: `record_location_selection_level_name (${record_location_selection_level_name}) missing from spatial_hierarchy.levels`,
      status: ECustomEdgeStatus.Red
    });
  }

  if (responses.length) {
    return responses;
  }

  return [
    {
      message: 'Nothing to check',
      status: ECustomEdgeStatus.Green
    }
  ];
}
