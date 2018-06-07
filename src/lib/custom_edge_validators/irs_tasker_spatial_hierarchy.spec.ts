// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TIrsTasker } from '../config_types/TIrsTasker';
import { TSpatialHierarchy } from '../config_types/TSpatialHierarchy';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { irs_tasker_spatial_hierarchy } from './irs_tasker_spatial_hierarchy';

test('should return Green status', t => {
  const empty_object = {} 
  const result = irs_tasker_spatial_hierarchy(empty_object as TIrsTasker, empty_object as TSpatialHierarchy)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})