import { TConfig } from "../config_types/TConfig";
import { ECustomEdgeStatus, TCustomEdgeResponses } from "../TCustomEdgeResponse";


export function fields_helper_decorators(_config: TConfig): TCustomEdgeResponses {
  // TODO: write custom edge validator for fields_helper_decorators
  return [{
    message: 'Nothing to check',
    status: ECustomEdgeStatus.Green
  }]
}