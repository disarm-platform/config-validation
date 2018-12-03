// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { applets_irs_tasker } from './applets_irs_tasker';

test('should return Green status', t => {
  const empty_object = {};
  const result = applets_irs_tasker(empty_object as TConfig);
  t.is(result[0].status, ECustomEdgeStatus.Green);
});
