import { TConfig } from './Config';
import { ENodeStatus, TNodeResponse } from './NodeResponse'
import { validateJsonSchema } from './validate_json_schema'

export function runNumberValidation(config: TConfig): TNodeResponse {
  // validates that 'number' exists in 'array_of_numbers'
  if (config.number_config && config.number_config.array_of_numbers.includes(config.number_config.number)) {
    return {
      messages: [],
      status: ENodeStatus.Green
    }
  } else {
    return {
      messages: [{description: 'number does not exist'}],
      status: ENodeStatus.Yellow
    }
  }
}




export function runOptionalStringValidation(config: TConfig): TNodeResponse {
  // first runtime validate
  const valid = validateJsonSchema('StringConfig', config.string_config)
  if (!valid) {
    return {
      messages: [{description: 'failed internal validation'}],
      status: ENodeStatus.Red
    }
  }
  
  // validates that optional_string is in strings, if it exists
  if (config.string_config && config.string_config.optional_string) {
    if (config.string_config && config.string_config.strings.includes(config.string_config.optional_string)) {
      return {
        messages: [],
        status: ENodeStatus.Green
      }
    } else {
      return {
        messages: [{description: 'optional_string does not exist'}],
        status: ENodeStatus.Yellow
      }
    }
  } else {
    return {
      messages: [],
      status: ENodeStatus.Green
    }
  }
}
