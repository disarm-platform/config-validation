import {has} from 'lodash'
import { TIrsTasker } from '../config_types/TIrsTasker';
import { TSpatialHierarchy } from '../config_types/TSpatialHierarchy';
import { ECustomEdgeStatus, TCustomEdgeResponse } from '../TCustomEdgeResponse';


export function irs_tasker_spatial_hierarchy(irs_tasker_config: TIrsTasker, spatial_hierarchy_config: TSpatialHierarchy): TCustomEdgeResponse {
  const messages = [];
  let status = ECustomEdgeStatus.Red;

  if (has(spatial_hierarchy_config, 'markers.planning_level_name')) {
    messages.push('markers.planning_level_name required and found');
    status = ECustomEdgeStatus.Green;
  } else {
    messages.push('markers.planning_level_name required and NOT found');
    status = ECustomEdgeStatus.Red;
  }

  return {messages, status}
}
