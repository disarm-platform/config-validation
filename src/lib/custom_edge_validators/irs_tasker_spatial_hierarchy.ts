import { ECustomEdgeStatus, TCustomEdgeResponses } from '../TCustomEdgeResponse';
import { TConfig } from '../config_types/TConfig';


export function irs_tasker_spatial_hierarchy(_config: TConfig): TCustomEdgeResponses {
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}
