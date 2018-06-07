// tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { create_helper_objects } from '../helper_functions';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { validations_fields_helper } from './validations_fields_helper';


test('returns Red status if validations expression form field is not in form', t => {
  const form =  {
    pages: [
      {
        "elements": [
          {
            "inputType": "number",
            "isRequired": true,
            "name": "number_sprayable",
            "title": "How many sprayable structures in the household/homestead?",
            "type": "text",
            "validators": [
              {
                "text": "Minimum Value is Zero",
                "type": "numeric",
              }
            ]
          }
        ],
        "name": "page1"
        }
    ]
  }
  const validations = [{
    "expression": "numbersprayed_ddt <= number_sprayable",
    "message": "Sprayed more with DDT than total",
    "name": "sprayed more with ddt than total",
    "type": "error"
  }]

  const fields_helper_not_fields_helper = {}

  const config = { form, validations, decorators: {}}
  const helpers = create_helper_objects(config as TConfig)

  const result = validations_fields_helper(validations, fields_helper_not_fields_helper, helpers)

  t.is(result.length, 2)
  
  t.is(result[0].status, ECustomEdgeStatus.Red)

  t.is(result[1].status, ECustomEdgeStatus.Green)
})


test('returns Green status if validations are valid', t => {
  const form = {
    pages: [
      {
        "elements": [
          {
            "inputType": "number",
            "isRequired": true,
            "name": "number_sprayable",
            "title": "How many sprayable structures in the household/homestead?",
            "type": "text",
            "validators": [
              {
                "text": "Minimum Value is Zero",
                "type": "numeric",
              }
            ]
          }
        ],
        "name": "page1"
      }
    ]
  }
  const validations = [{
    "expression": "number_sprayable > 0",
    "message": "Sprayed more with DDT than total",
    "name": "sprayed more with ddt than total",
    "type": "error"
  }]

  const fields_helper_not_fields_helper = {}

  const config = { form, validations, decorators: {} }
  const helpers = create_helper_objects(config as TConfig)

  const result = validations_fields_helper(validations, fields_helper_not_fields_helper, helpers)

  t.is(result.length, 1)

  t.is(result[0].status, ECustomEdgeStatus.Green)
})
