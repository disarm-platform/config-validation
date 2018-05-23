import { TConfig } from './config';
import { EStatus, TNodeResponse } from './responses';

export function run_number_validation(config: TConfig): TNodeResponse {
  // validates that 'number' exists in 'array_of_numbers'
  if (
    config.number_config &&
    config.number_config.array_of_numbers.includes(config.number_config.number)
  ) {
    return {
      messages: [],
      status: EStatus.Green
    };
  } else {
    return {
      messages: [{ description: 'number does not exist' }],
      status: EStatus.Yellow
    };
  }
}

export function run_optional_string_validation(config: TConfig): TNodeResponse {
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
        status: EStatus.Green
      };
    } else {
      return {
        messages: [{ description: 'optional_string does not exist' }],
        status: EStatus.Yellow
      };
    }
  } else {
    return {
      messages: [],
      status: EStatus.Green
    };
  }
}
