export interface TDenominatorFields {
  [k: string]: string;
}

export interface TMarkers {
  planning_level_name: string;
  record_location_selection_level_name: string;
  denominator_fields: TDenominatorFields;
}

export interface TLevel {
  level_id: string;
  group_by_field?: string;
  field_name: string;
  display_field_name: string;
  name: string;
}

export enum EFieldType {
  NotSet = 'NotSet', // Initial value
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  Unreliable = 'Unreliable'
}

export interface TFieldSummary {
  field_name: string;
  exists_on_all: boolean; // The field exists on every feature
  type: EFieldType; // Checks only those values given, so use with exists_on_all
  unique: boolean; // Checks only those values given, so use with exists_on_all
  sample_values?: string[]; // Optional sample of the values for the field
}

export interface TGeodataSummary {
  [k: string]: TFieldSummary[];
}

export interface TSpatialHierarchy {
  ignore_planning_level_restriction?: boolean;
  data_version: number;
  markers: TMarkers;
  levels: TLevel[];
  geodata_summary: TGeodataSummary;
}
