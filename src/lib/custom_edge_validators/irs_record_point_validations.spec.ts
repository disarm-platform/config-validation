// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { irs_record_point_validations } from './irs_record_point_validations';

test('should return Green status', t => {
  const config = {};
  const result = irs_record_point_validations(config as TConfig);
  t.is(result[0].status, ECustomEdgeStatus.Green);
});
