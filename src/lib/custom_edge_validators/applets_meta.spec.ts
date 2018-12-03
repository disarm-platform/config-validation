// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { applets_meta } from './applets_meta';

test('should return Green status', t => {
  const empty_object = {};
  const result = applets_meta(empty_object as TConfig);
  t.is(result[0].status, ECustomEdgeStatus.Green);
});
