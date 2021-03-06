// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { irs_plan_map_focus } from './irs_plan_map_focus';

test('should return Green status', t => {
  const config = {};
  const result = irs_plan_map_focus(config as TConfig);
  t.is(result[0].status, ECustomEdgeStatus.Green);
});
