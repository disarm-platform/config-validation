import {Response, Status} from './response'

export interface number_config {
  number: number;
  array_of_numbers: number[];
}

export function run_number_validation(config: number_config) : Response {
  // validates that 'number' exists in 'array_of_numbers'
  if (config.array_of_numbers.includes(config.number)) {
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

export interface string_config {
  strings: string[],
  optional_string?: string
}


export function run_optional_string_validation(config: string_config) {
  // validates that optional_string is in strings, if it exists

  if (config.hasOwnProperty('optional_string')) {
    if (config.strings.includes(config.optional_string as string)) {
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