import {
  TConfig,
  TInstanceConfig,
  TNumberConfig,
  TStringConfig
} from './Config';
import { EEdgeStatus, TEdgeResponse } from './EdgeResponse';
import { EUnifiedStatus, TUnifiedResponse } from './UnifiedResponse';
import { validateJsonSchema } from './validate_json_schema';

/**
 * Take the whole config and figure if it's valid.
 */
export function validate(config: TConfig): TUnifiedResponse {
  // Figure all the parts needed
  // Validate each in turn
  const description = `${
    config.number_config ? config.number_config.number : 0
  }`;

  return {
    messages: [{ description }],
    status: EUnifiedStatus.Green
  };
}

/**
 * Take individual nodes of the config, and figure if they are valid.
 */
export function validate_edge(
  node: TNumberConfig | TStringConfig | TInstanceConfig
): TEdgeResponse {
  const description = (node as TNumberConfig).number ? 'one' : 'zero';

  return {
    messages: [{ description }],
    status: EEdgeStatus.Blue
  };
}

export function runNumberValidation(config: TConfig): TEdgeResponse {
  // validates that 'number' exists in 'array_of_numbers'
  if (
    config.number_config &&
    config.number_config.array_of_numbers.includes(config.number_config.number)
  ) {
    return {
      messages: [],
      status: EEdgeStatus.Green
    };
  } else {
    return {
      messages: [{ description: 'number does not exist' }],
      status: EEdgeStatus.Yellow
    };
  }
}

export function runOptionalStringValidation(config: TConfig): TEdgeResponse {
  // first runtime validate
  const valid = validateJsonSchema(config);
  if (!valid) {
    return {
      messages: [{ description: 'failed internal validation' }],
      status: EEdgeStatus.Red
    };
  }

  // validates that optional_string is in strings, if it exists
  if (config.string_config && config.string_config.optional_string) {
    if (
      config.string_config &&
      config.string_config.strings.includes(
        config.string_config.optional_string
      )
    ) {
      return {
        messages: [],
        status: EEdgeStatus.Green
      };
    } else {
      return {
        messages: [{ description: 'optional_string does not exist' }],
        status: EEdgeStatus.Yellow
      };
    }
  } else {
    return {
      messages: [],
      status: EEdgeStatus.Green
    };
  }
}
