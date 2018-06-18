// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { fields_helper_form } from './fields_helper_form';

test('should return Green status', t => {
  const empty_object = {};
  const result = fields_helper_form(empty_object as TConfig);
  t.is(result[0].status, ECustomEdgeStatus.Green);
});
