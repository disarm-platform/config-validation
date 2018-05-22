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


