// tslint:disable:no-expression-statement
import {test} from 'ava'
import { Response, Status } from './response';
import { run_number_validation, number_config, string_config, run_optional_string_validation } from './validate'

test('valid config number', t => {
  const validConfig : number_config = {
    array_of_numbers: [1, 2],
    number: 1
  }

  const result: Response = run_number_validation({number_config: validConfig})

  t.is(result.status, Status.Green)
  t.is(result.messages.length, 0)
})

test('invalid config number', t => {
  const invalidConfig: number_config = {
    array_of_numbers: [1, 2],
    number: 4
  }

  const result: Response = run_number_validation({number_config: invalidConfig})

  t.is(result.status, Status.Yellow)
  t.is(result.messages.length, 1)
})

test('valid config string', t => {
  const validConfig: string_config = {
    strings: ['hi', 'hello']
  }

  const result: Response = run_optional_string_validation({string_config: validConfig})

  t.is(result.status, Status.Green)
  t.is(result.messages.length, 0)
})

test('invalid config string', async t => {
  const validConfig: string_config = {
    strings: ['hi', 'hello'],
    optional_string: 'not hello'
  }

  const result: Response = run_optional_string_validation({string_config: validConfig})

  t.is(result.status, Status.Yellow)
  t.is(result.messages.length, 1)
})
