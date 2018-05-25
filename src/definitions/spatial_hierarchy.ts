export interface DenominatorFields {
  [k: string]: string;
}

export interface Markers {
  planning_level_name: string;
  record_location_selection_level_name: string;
  denominator_fields: DenominatorFields;
}


export interface Level {
  group_by_field?: string;
  field_name: string;
  display_field_name: string;
  name: string;
}

export interface SpatialHierarchy {
  ignore_planning_level_restriction?: boolean;
  data_version: number;
  markers: Markers;
  levels: Level[];
}