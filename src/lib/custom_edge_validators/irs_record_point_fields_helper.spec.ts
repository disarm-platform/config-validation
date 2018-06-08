// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { irs_record_point_fields_helper } from './irs_record_point_fields_helper';

test('should return Green status', t => {
  const empty_object = {}
  const result = irs_record_point_fields_helper(empty_object as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})