import { TIrsTasker } from '../config_types/TIrsTasker';
import { TSpatialHierarchy } from '../config_types/TSpatialHierarchy';
import { THelpers } from '../helper_functions/create_helper_objects';
import { ECustomEdgeStatus, TCustomEdgeResponses } from '../TCustomEdgeResponse';


export function irs_tasker_spatial_hierarchy(_irs_tasker_config: TIrsTasker, _spatial_hierarchy_config: TSpatialHierarchy, _helpers: THelpers): TCustomEdgeResponses {
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}
