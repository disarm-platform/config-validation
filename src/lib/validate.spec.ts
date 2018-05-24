// tslint:disable:no-expression-statement
import {test} from 'ava'
import { NumberConfig, Response, Status, StringConfig } from './response';
import { runNumberValidation, runOptionalStringValidation } from './validate'

test('valid config number', t => {
  const validConfig : NumberConfig = {
    array_of_numbers: [1, 2],
    number: 1
  }

  const result: Response = runNumberValidation({number_config: validConfig})

  t.is(result.status, Status.Green)
  t.is(result.messages.length, 0)
})

test('invalid config number', t => {
  const invalidConfig: NumberConfig = {
    array_of_numbers: [1, 2],
    number: 4
  }

  const result: Response = runNumberValidation({number_config: invalidConfig})

  t.is(result.status, Status.Yellow)
  t.is(result.messages.length, 1)
})

test('valid config string', t => {
  const validConfig: StringConfig = {
    strings: ['hi', 'hello']
  }

  const result: Response = runOptionalStringValidation({string_config: validConfig})

  t.is(result.status, Status.Green)
  t.is(result.messages.length, 0)
})

test('invalid config string', async t => {
  const validConfig: StringConfig = {
    optional_string: 'not hello',
    strings: ['hello', 'hi']
  }

  const result: Response = runOptionalStringValidation({string_config: validConfig})

  t.is(result.status, Status.Yellow)
  t.is(result.messages.length, 1)
})


test('internally invalid config string', async t => {
  const internallyInvalidConfig = {
    not_strings: ['hello', 'hi']
  }
  // @ts-ignore
  const result: Response = runOptionalStringValidation({ string_config: internallyInvalidConfig })

  t.is(result.status, Status.Red)
  t.is(result.messages.length, 1)
})
