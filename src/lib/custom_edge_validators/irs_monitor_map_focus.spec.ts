// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TIrsMonitor } from '../config_types/TIrsMonitor';
import { TMapFocus } from '../config_types/TMapFocus';
import { THelpers } from '../helper_functions/create_helper_objects';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { irs_monitor_map_focus } from './irs_monitor_map_focus';

test('should return Green status', t => {
  const empty_object = {}
  const result = irs_monitor_map_focus(empty_object as TIrsMonitor, empty_object as TMapFocus, empty_object as THelpers)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})