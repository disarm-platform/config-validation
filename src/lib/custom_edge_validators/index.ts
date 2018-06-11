import { TConfig } from '../config_types/TConfig';
import { TCustomEdgeResponse } from '../TCustomEdgeResponse';
import { aggregations_field_helper } from './aggregations_field_helper';
import { aggregations_spatial_hierarchy } from './aggregations_spatial_hierarchy';
import { decorators_form } from './decorators_form';
import { irs_monitor_aggregations } from './irs_monitor_aggregations';
import { irs_monitor_fields_helper } from './irs_monitor_fields_helper';
import { irs_monitor_map_focus } from './irs_monitor_map_focus';
import { irs_monitor_spatial_hierarchy } from './irs_monitor_spatial_hierarchy';
import { irs_plan_map_focus } from './irs_plan_map_focus'
import { irs_plan_spatial_hierarchy } from './irs_plan_spatial_hierarchy'
import { irs_record_point_fields_helper } from './irs_record_point_fields_helper';
import { irs_record_point_location_selection } from './irs_record_point_location_selection';
import { irs_record_point_validations } from './irs_record_point_validations';
import { irs_tasker_map_focus } from './irs_tasker_map_focus';
import { irs_tasker_spatial_hierarchy } from './irs_tasker_spatial_hierarchy';
import { location_selection_spatial_hierarchy } from './location_selection_spatial_hierarchy';
import { meta_instance } from './meta_instance';
import { validations_fields_helper } from './validations_fields_helper';


export interface TCustomEdgeValidators {
  [k: string]: (config: TConfig) => TCustomEdgeResponse[]
}

export const CustomEdgeValidators: TCustomEdgeValidators = {
  aggregations_field_helper,
  aggregations_spatial_hierarchy,
  decorators_form,
  irs_monitor_aggregations,
  irs_monitor_fields_helper,
  irs_monitor_map_focus,
  irs_monitor_spatial_hierarchy,
  irs_plan_map_focus,
  irs_plan_spatial_hierarchy,
  irs_record_point_fields_helper,
  irs_record_point_location_selection,
  irs_record_point_validations,
  irs_tasker_map_focus,
  irs_tasker_spatial_hierarchy,
  location_selection_spatial_hierarchy,
  meta_instance,
  validations_fields_helper
};
