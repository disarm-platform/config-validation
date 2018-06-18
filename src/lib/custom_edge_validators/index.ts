import { TConfig } from '../config_types/TConfig';
import { TCustomEdgeResponse } from '../TCustomEdgeResponse';
import { aggregations_fields_helper } from './aggregations_fields_helper';
import { aggregations_spatial_hierarchy } from './aggregations_spatial_hierarchy';
import { applets_irs_monitor } from './applets_irs_monitor';
import { applets_irs_plan } from './applets_irs_plan';
import { applets_irs_record_point } from './applets_irs_record_point';
import { applets_irs_tasker } from './applets_irs_tasker';
import { applets_meta } from './applets_meta';
import { decorators_form } from './decorators_form';
import { fields_helper_decorators } from './fields_helper_decorators';
import { fields_helper_form } from './fields_helper_form';
import { irs_monitor_aggregations } from './irs_monitor_aggregations';
import { irs_monitor_fields_helper } from './irs_monitor_fields_helper';
import { irs_monitor_map_focus } from './irs_monitor_map_focus';
import { irs_monitor_spatial_hierarchy } from './irs_monitor_spatial_hierarchy';
import { irs_plan_map_focus } from './irs_plan_map_focus';
import { irs_plan_spatial_hierarchy } from './irs_plan_spatial_hierarchy';
import { irs_record_point_form } from './irs_record_point_form';
import { irs_record_point_location_selection } from './irs_record_point_location_selection';
import { irs_record_point_validations } from './irs_record_point_validations';
import { irs_tasker_map_focus } from './irs_tasker_map_focus';
import { irs_tasker_spatial_hierarchy } from './irs_tasker_spatial_hierarchy';
import { meta_instance } from './meta_instance';
import { spatial_hierarchy_geodata_levels } from './spatial_hierarchy_geodata_levels';
import { validations_fields_helper } from './validations_fields_helper';

export interface TCustomEdgeValidators {
  [k: string]: (config: TConfig) => TCustomEdgeResponse[];
}

export const CustomEdgeValidators: TCustomEdgeValidators = {
  aggregations_fields_helper,
  aggregations_spatial_hierarchy,
  applets_irs_monitor,
  applets_irs_plan,
  applets_irs_record_point,
  applets_irs_tasker,
  applets_meta,
  decorators_form,
  fields_helper_decorators,
  fields_helper_form,
  irs_monitor_aggregations,
  irs_monitor_fields_helper,
  irs_monitor_map_focus,
  irs_monitor_spatial_hierarchy,
  irs_plan_map_focus,
  irs_plan_spatial_hierarchy,
  irs_record_point_form,
  irs_record_point_location_selection,
  irs_record_point_validations,
  irs_tasker_map_focus,
  irs_tasker_spatial_hierarchy,
  meta_instance,
  spatial_hierarchy_geodata_levels,
  validations_fields_helper
};
