import {Response, Status} from './response'

export interface number_config {
  number: number;
  array_of_numbers: number[];
}

export interface string_config {
  strings: string[],
  optional_string?: string
}

export interface Config {
  number_config?: number_config,
  string_config?: string_config
}

export function run_number_validation(config: Config) : Response {
  // validates that 'number' exists in 'array_of_numbers'
  if ((config.number_config as number_config).array_of_numbers.includes((config.number_config as number_config).number)) {
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




export function run_optional_string_validation(config: Config) {
  // validates that optional_string is in strings, if it exists

  if ((config.string_config as string_config).hasOwnProperty('optional_string')) {
    if ((config.string_config as string_config).strings.includes((config.string_config as string_config).optional_string as string)) {
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