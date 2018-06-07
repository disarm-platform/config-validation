// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { irs_plan_map_focus } from './irs_plan_map_focus';

test('should return Green status', t => {
  const result = irs_plan_map_focus()
  t.is(result.status, ECustomEdgeStatus.Green)
})