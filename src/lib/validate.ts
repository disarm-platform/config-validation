import { Config } from '../definitions';
import { UnifiedStatus, UnifiedResponse } from './UnifiedResponse';
import { validateJsonSchema } from './validate_json_schema';

/**
 * Take the whole config and figure if it's valid.
 */
export function validate(config: Config): UnifiedResponse {
  // Figure all the parts needed
  // Validate each in turn
  const valid = validateJsonSchema(config);
  console.log('valid', valid);
  if (!valid) {
    return {
      messages: [{ description: 'failed internal validation' }],
      status: UnifiedStatus.Red
    };
  }

  return {
    messages: [],
    status: UnifiedStatus.Green
  };
}