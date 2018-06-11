// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { location_selection_spatial_hierarchy } from './location_selection_spatial_hierarchy';

test('should return Green status', t => {
  const empty_object = {}
  const result = location_selection_spatial_hierarchy(empty_object as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})