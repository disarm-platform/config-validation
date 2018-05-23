// tslint:disable:no-expression-statement
import { test } from 'ava';
import { TNumberConfig, TStringConfig } from './config';
import {
  run_number_validation,
  run_optional_string_validation
} from './example_validate';
import { EStatus, TNodeResponse } from './responses';

test('valid config number', t => {
  const validConfig: TNumberConfig = {
    array_of_numbers: [1, 2],
    number: 1
  };

  const result: TNodeResponse = run_number_validation({
    number_config: validConfig
  });

  t.is(result.status, EStatus.Green);
  t.is(result.messages.length, 0);
});

test('invalid config number', t => {
  const invalidConfig: TNumberConfig = {
    array_of_numbers: [1, 2],
    number: 4
  };

  const result: TNodeResponse = run_number_validation({
    number_config: invalidConfig
  });

  t.is(result.status, EStatus.Yellow);
  t.is(result.messages.length, 1);
});

test('valid config string', t => {
  const validConfig: TStringConfig = {
    strings: ['hi', 'hello']
  };

  const result: TNodeResponse = run_optional_string_validation({
    string_config: validConfig
  });

  t.is(result.status, EStatus.Green);
  t.is(result.messages.length, 0);
});

test('invalid config string', async t => {
  const validConfig: TStringConfig = {
    optional_string: 'not hello',
    strings: ['hi', 'hello']
  };

  const result: TNodeResponse = run_optional_string_validation({
    string_config: validConfig
  });

  t.is(result.status, EStatus.Yellow);
  t.is(result.messages.length, 1);
});
