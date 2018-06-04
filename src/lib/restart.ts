import { TConfig } from '../definitions/TConfig';
import { EUnifiedStatus, TUnifiedResponse } from './TUnifiedResponse';

export function validate(config: TConfig): TUnifiedResponse {
  // Step 1: schema validation

  // Step 2: edge validation

  return {
    messages: [''],
    status: EUnifiedStatus.Green
  }
}


function schema_validation() {

}

function edge_validation() {

}