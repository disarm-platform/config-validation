import {Response, Status} from './response'

export interface NumberConfig {
  number: number;
  array_of_numbers: number[];
}

export interface StringConfig {
  strings: string[],
  optional_string?: string
}

export interface Config {
  number_config?: NumberConfig,
  string_config?: StringConfig
}

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