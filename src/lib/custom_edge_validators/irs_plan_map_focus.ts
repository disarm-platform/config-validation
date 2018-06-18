import { TConfig } from '../config_types/TConfig';
import {
  ECustomEdgeStatus,
  TCustomEdgeResponses
} from '../TCustomEdgeResponse';

export function irs_plan_map_focus(_config: TConfig): TCustomEdgeResponses {
  return [
    {
      message: 'Nothing to check',
      status: ECustomEdgeStatus.Green
    }
  ];
}
