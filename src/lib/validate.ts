import { Config } from '../definitions';
import { EUnifiedStatus, TUnifiedResponse } from './UnifiedResponse';
import { validateJsonSchema } from './validate_json_schema';

/**
 * Take the whole config and figure if it's valid.
 */
export function validate(config: Config): TUnifiedResponse {
  // Figure all the parts needed
  // Validate each in turn
  const valid = validateJsonSchema(config);
  if (!valid) {
    return {
      messages: [{ description: 'failed internal validation' }],
      status: EUnifiedStatus.Red
    };
  }

  return {
    messages: [],
    status: EUnifiedStatus.Green
  };
}