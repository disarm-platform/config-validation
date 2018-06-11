// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { spatial_hierarchy_geodata_levels } from './spatial_hierarchy_geodata_levels';

test('should return Green status', t => {
  const empty_object = {}
  const result = spatial_hierarchy_geodata_levels(empty_object as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})