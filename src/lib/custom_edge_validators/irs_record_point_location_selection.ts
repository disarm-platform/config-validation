import { TConfig } from '../config_types/TConfig';
import {
  ECustomEdgeStatus,
  TCustomEdgeResponses
} from '../TCustomEdgeResponse';

export function irs_record_point_location_selection(
  _config: TConfig
): TCustomEdgeResponses {
  return [
    {
      message: 'Nothing to check',
      status: ECustomEdgeStatus.Green
    }
  ];
}
