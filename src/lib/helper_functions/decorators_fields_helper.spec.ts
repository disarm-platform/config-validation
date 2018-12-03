// tslint:disable:no-expression-statement
import { test } from 'ava';
import { TDecorators } from '../config_types/TDecorators';
import { fields_in_decorators } from './decorators_fields_helper';

test('gets fields used in decorators without getting constants', t => {
  const decorators: TDecorators = {
    status: [
      {
        red: 'number_unsprayable == number_sprayable'
      },
      {
        green: 'number_sprayable == 1'
      }
    ]
  };

  const result = fields_in_decorators(decorators);

  t.is(result.length, 2);
  t.is(result[0], 'number_unsprayable');
  t.is(result[1], 'number_sprayable');
});

test('gets fields used in decorators', t => {
  const decorators: TDecorators = {
    status: [
      {
        red: 'number_unsprayable == number_sprayable'
      },
      {
        green: 'number_sprayable == numbersprayed_ddt + numbersprayed_delta'
      }
    ]
  };

  const result = fields_in_decorators(decorators);

  t.is(result.length, 4);
  t.is(result[0], 'number_unsprayable');
  t.is(result[1], 'number_sprayable');
  t.is(result[2], 'numbersprayed_ddt');
  t.is(result[3], 'numbersprayed_delta');
});
