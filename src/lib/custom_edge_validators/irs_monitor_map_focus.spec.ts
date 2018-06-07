// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { irs_monitor_map_focus } from './irs_monitor_map_focus';

test('should return Green status', t => {
  const result = irs_monitor_map_focus()
  t.is(result.status, ECustomEdgeStatus.Green)
})