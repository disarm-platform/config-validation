import { TConfig } from '../config_types/TConfig';
import {
  ECustomEdgeStatus,
  TCustomEdgeResponses
} from '../TCustomEdgeResponse';

export function applets_meta(_config: TConfig): TCustomEdgeResponses {
  return [
    {
      message: 'Nothing to check',
      status: ECustomEdgeStatus.Green
    }
  ];
}
