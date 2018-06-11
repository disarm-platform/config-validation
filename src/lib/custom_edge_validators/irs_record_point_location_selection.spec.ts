// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { irs_record_point_location_selection } from './irs_record_point_location_selection';

test('should return Green status', t => {
  const empty_object = {}
  const result = irs_record_point_location_selection(empty_object as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})