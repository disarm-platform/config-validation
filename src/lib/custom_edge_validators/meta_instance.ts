import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";


export function meta_instance(_config: TConfig): TCustomEdgeResponses {
  // TODO: write custom edge validator for meta_instance
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}