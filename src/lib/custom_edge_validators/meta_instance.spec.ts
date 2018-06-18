// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { meta_instance } from './meta_instance';

test('should return Green status', t => {
  const empty_object = {};
  const result = meta_instance(empty_object as TConfig);
  t.is(result[0].status, ECustomEdgeStatus.Green);
});
