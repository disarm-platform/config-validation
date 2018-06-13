// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { irs_record_point_form } from './irs_record_point_form';

test('should return Green status', t => {
  const empty_object = {form: {}}
  const result = irs_record_point_form(empty_object as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})