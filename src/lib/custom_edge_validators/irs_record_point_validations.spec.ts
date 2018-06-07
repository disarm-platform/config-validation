// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TIrsRecordPoint } from '../config_types/TIrsRecordPoint';
import { TValidations } from '../config_types/TValidations';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { irs_record_point_validations } from './irs_record_point_validations';


test('should return Green status', t => {
  const empty_object = {}
  const result = irs_record_point_validations(empty_object as TIrsRecordPoint, empty_object as TValidations)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})