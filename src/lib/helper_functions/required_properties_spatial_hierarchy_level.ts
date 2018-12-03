import { get } from 'lodash';
import { TFieldSummary, TLevel } from '../config_types/TSpatialHierarchy';
import { ECustomEdgeStatus, TCustomEdgeResponse } from '../TCustomEdgeResponse';

export function required_properties_on_sh_level(
  spatial_hierarchy_level: TLevel,
  geodata_properties_summary: TFieldSummary[]
): TCustomEdgeResponse {
  const required_fields = ['group_by_field', 'field_name']
    .map(n => get(spatial_hierarchy_level, n))
    .filter(i => i);

  const all_required_fields_exist = required_fields.map(
    (field_name): TCustomEdgeResponse => {
      const found = geodata_properties_summary.find(
        s => s.field_name === field_name
      );
      if (found) {
        return {
          message: 'Found',
          status: ECustomEdgeStatus.Green
        };
      } else {
        return {
          message: `${field_name} missing`,
          status: ECustomEdgeStatus.Red
        };
      }
    }
  );

  if (
    all_required_fields_exist.every(e => e.status === ECustomEdgeStatus.Green)
  ) {
    return {
      message: 'All required fields exist',
      status: ECustomEdgeStatus.Green
    };
  } else {
    const messages_string = all_required_fields_exist
      .map(e => e.message)
      .join(', ');
    return {
      message: 'Missing fields: ' + messages_string,
      status: ECustomEdgeStatus.Red
    };
  }
}
