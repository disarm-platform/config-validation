// tslint:disable:no-expression-statement
import {test} from 'ava'
import { Response, Status } from './response';
import { run_number_validation, number_config } from './validate'

test('valid config', t => {
  const validConfig : number_config = {
    array_of_numbers: [1, 2],
    number: 1
  }

  const result: Response = run_number_validation(validConfig)

  t.is(result.status, Status.Green)
})

test('invalid config', t => {
  const invalidConfig: number_config = {
    array_of_numbers: [1, 2],
    number: 4
  }

  const result: Response = run_number_validation(invalidConfig)

  t.is(result.status, Status.Yellow)
})