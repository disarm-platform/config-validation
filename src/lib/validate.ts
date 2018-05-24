import {Config, Response, Status } from './response'
import { validateJsonSchema } from './validate_json_schema'

export function runNumberValidation(config: Config) : Response {
  // validates that 'number' exists in 'array_of_numbers'
  if (config.number_config && config.number_config.array_of_numbers.includes(config.number_config.number)) {
    return {
      messages: [],
      status: Status.Green
    }
  } else {
    return {
      messages: ['number does not exist'],
      status: Status.Yellow
    }
  }
}




export function runOptionalStringValidation(config: Config) : Response {
  // first runtime validate
  const valid = validateJsonSchema('StringConfig', config.string_config)
  // tslint:disable:no-console
  // @ts-ignore
  console.log('valid', valid);
  if (!valid) {
    return {
      messages: ['failed internal validation'],
      status: Status.Red
    }
  }
  
  // validates that optional_string is in strings, if it exists
  if (config.string_config && config.string_config.optional_string) {
    if (config.string_config && config.string_config.strings.includes(config.string_config.optional_string)) {
      return {
        messages: [],
        status: Status.Green
      }
    } else {
      return {
        messages: ['optional_string does not exist'],
        status: Status.Yellow
      }
    }
  } else {
    return {
      messages: [],
      status: Status.Green
    }
  }
}