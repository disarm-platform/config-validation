import { TConfig } from '../config_types/TConfig';
import {
  ECustomEdgeStatus,
  TCustomEdgeResponses
} from '../TCustomEdgeResponse';

export function irs_record_point_form(_config: TConfig): TCustomEdgeResponses {
  return [
    {
      message: 'Form, required by irs_record_point, is available.',
      status: ECustomEdgeStatus.Green
    }
  ];
}
