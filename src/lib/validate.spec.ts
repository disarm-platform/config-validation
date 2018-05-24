// tslint:disable:no-expression-statement
import { test } from 'ava';
import { TNumberConfig, TStringConfig } from './Config';
import { EEdgeStatus, TEdgeResponse } from './EdgeResponse';
import { runNumberValidation, runOptionalStringValidation } from './validate';

test('valid config number', t => {
  const validConfig: TNumberConfig = {
    array_of_numbers: [1, 2],
    number: 1
  };

  const result: TEdgeResponse = runNumberValidation({
    number_config: validConfig
  });

  t.is(result.status, EEdgeStatus.Green);
  t.is(result.messages.length, 0);
});

test('invalid config number', t => {
  const invalidConfig: TNumberConfig = {
    array_of_numbers: [1, 2],
    number: 4
  };

  const result: TEdgeResponse = runNumberValidation({
    number_config: invalidConfig
  });

  t.is(result.status, EEdgeStatus.Yellow);
  t.is(result.messages.length, 1);
});

test('valid config string', t => {
  const validConfig: TStringConfig = {
    strings: ['hi', 'hello']
  };

  const result: TEdgeResponse = runOptionalStringValidation({
    string_config: validConfig
  });

  t.is(result.status, EEdgeStatus.Green);
  t.is(result.messages.length, 0);
});

test('invalid config string', async t => {
  const validConfig: TStringConfig = {
    optional_string: 'not hello',
    strings: ['hello', 'hi']
  };

  const result: TEdgeResponse = runOptionalStringValidation({
    string_config: validConfig
  });

  t.is(result.status, EEdgeStatus.Yellow);
  t.is(result.messages.length, 1);
});

test('internally invalid config string', async t => {
  const internallyInvalidConfig = {
    not_strings: ['hello', 'hi']
  };
  // @ts-ignore
  const result: TEdgeResponse = runOptionalStringValidation({
    string_config: internallyInvalidConfig
  });

  t.is(result.status, EEdgeStatus.Red);
  t.is(result.messages.length, 1);
});
