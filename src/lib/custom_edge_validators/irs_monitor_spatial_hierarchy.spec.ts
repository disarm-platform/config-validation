// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { irs_monitor_spatial_hierarchy } from './irs_monitor_spatial_hierarchy';

test('should return Green status', t => {
  const empty_object = {}
  const result = irs_monitor_spatial_hierarchy(empty_object as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})