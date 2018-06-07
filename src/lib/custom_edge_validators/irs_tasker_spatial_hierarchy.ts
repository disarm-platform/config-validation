import { TIrsTasker } from '../config_types/TIrsTasker';
import { TSpatialHierarchy } from '../config_types/TSpatialHierarchy';
import { ECustomEdgeStatus, TCustomEdgeResponses } from '../TCustomEdgeResponse';


export function irs_tasker_spatial_hierarchy(_irs_tasker_config: TIrsTasker, _spatial_hierarchy_config: TSpatialHierarchy): TCustomEdgeResponses {
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}
