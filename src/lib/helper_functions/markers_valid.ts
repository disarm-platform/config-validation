import { TGeodataSummary, TSpatialHierarchy } from "../config_types/TSpatialHierarchy";
import { ECustomEdgeStatus, TCustomEdgeResponse } from "../TCustomEdgeResponse";


export function markers_valid(spatial_hierarchy: TSpatialHierarchy, geodata_summary: TGeodataSummary): TCustomEdgeResponse {
  const markers = spatial_hierarchy.markers;
  const geodata_layer_names = Object.keys(geodata_summary);

  // planning_level_name is a level
  const planning_level_name_valid = geodata_layer_names.includes(markers.planning_level_name);
  if (!planning_level_name_valid) {
    return {
      message: `planning_level_name invalid: Cannot find ${markers.planning_level_name} in markers ${JSON.stringify(markers)}`,
      status: ECustomEdgeStatus.Red
    }
  }
  // record_location_selection_level_name is a level
  const record_location_selection_level_name_valid = geodata_layer_names.includes(markers.record_location_selection_level_name);
  if (!record_location_selection_level_name_valid) {
    return {
      message: `record_location_selection_level_name invalid: Cannot find ${markers.planning_level_name} in markers ${JSON.stringify(markers)}`,
      status: ECustomEdgeStatus.Red
    }
  }

  // denominator_fields exist on the planning_level_name level
  // Only check these if the planning_level_name is valid
  const denominator_fields = Object.values(markers.denominator_fields);
  const denominator_level = geodata_summary[markers.planning_level_name];
  const level_fields = denominator_level.map(l => l.field_name);
  const denominator_fields_valid = denominator_fields.every(f => level_fields.includes(f));
  if (!denominator_fields_valid) {
    return {
      message: `Denominator fields invalid: Looking for: ${denominator_fields}`, 
      status: ECustomEdgeStatus.Red
    }
  } else {
    return {
      message: 'Markers valid',
      status: ECustomEdgeStatus.Green,
    }
  }

}