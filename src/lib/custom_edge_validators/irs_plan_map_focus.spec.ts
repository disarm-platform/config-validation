// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TIrsPlan } from '../config_types/TIrsPlan';
import { TMapFocus } from '../config_types/TMapFocus';
import { THelpers } from '../helper_functions/create_helper_objects';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { irs_plan_map_focus } from './irs_plan_map_focus';

test('should return Green status', t => {
  const empty_object = {}
  const result = irs_plan_map_focus(empty_object as TIrsPlan, empty_object as TMapFocus, empty_object as THelpers)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})