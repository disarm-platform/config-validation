// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { ECustomEdgeStatus } from "../TCustomEdgeResponse";
import { irs_record_point_form } from './irs_record_point_form';

test('should return Green status', t => {
  const config = {form: {}, applets:{ irs_record_point: {}}}
  const result = irs_record_point_form(config as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})

test('if filter_field is given, must exist on form, return Red', t => {
  const config = {form: {}, applets:{irs_record_point: {filter_field: 'a'}}}
  const result = irs_record_point_form(config as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Red)
})

test('if filter_field is given, must exist on form, return green', t => {
  const config = { 
    applets: { irs_record_point: { filter_field: 'number_sprayable' } },
    form: {
      pages: [
        {
          elements: [
            {
              inputType: "number",
              isRequired: true,
              name: "number_sprayable",
              title: "How many sprayable structures in the household/homestead?",
              type: "text",
            }
          ],
          name: "page1"
        }
      ]
    } 
  }
  // @ts-ignore
  const result = irs_record_point_form(config as TConfig)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})