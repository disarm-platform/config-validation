import { TConfig } from '../config_types/TConfig';
import { TCustomEdgeResponse } from '../TCustomEdgeResponse';
import { aggregations_field_helper } from './aggregations_field_helper';
// import { irs_monitor_aggregations } from './irs_monitor_aggregations';
// import { irs_monitor_map_focus } from './irs_monitor_map_focus';
// import { irs_plan_map_focus } from './irs_plan_map_focus'
import { irs_record_point_location_selection } from './irs_record_point_location_selection';
// import { irs_record_point_validations } from './irs_record_point_validations';
// import { irs_tasker_map_focus } from './irs_tasker_map_focus';
// import { irs_tasker_spatial_hierarchy } from './irs_tasker_spatial_hierarchy';
// import { validations_fields_helper } from './validations_fields_helper';


export interface TCustomEdgeValidators {
  [k: string]: (config: TConfig) => TCustomEdgeResponse[]
}

export const CustomEdgeValidators: TCustomEdgeValidators = {
  aggregations_field_helper,
  // irs_monitor_aggregations,
  // irs_monitor_map_focus,
  // irs_plan_map_focus,
  irs_record_point_location_selection,
  // irs_record_point_validations,
  // irs_tasker_map_focus,
  // irs_tasker_spatial_hierarchy,
  // validations_fields_helper
};
