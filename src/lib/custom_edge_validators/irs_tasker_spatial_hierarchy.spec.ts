// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { irs_tasker_spatial_hierarchy } from './irs_tasker_spatial_hierarchy';
import { TConfig } from '../config_types/TConfig';

test('should return Green status', t => {
  const config = {} 
  const result = irs_tasker_spatial_hierarchy(config as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})