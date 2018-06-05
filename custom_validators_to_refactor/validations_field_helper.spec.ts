// tslint:disable:no-expression-statement
import { test } from 'ava';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { validations_fields_helper } from './validations_fields_helper';


test('returns Yellow status if validations expression form field is not in form', t => {
  const config = {
    applets: {
      irs_record_point: {}
    },
    form: {
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
    },
    validations: [{
      "expression": "numbersprayed_ddt <= number_sprayable",
      "message": "Sprayed more with DDT than total",
      "name": "sprayed more with ddt than total",
      "type": "error"
    }]
  }
  // @ts-ignore
  const result = validations_fields_helper(config)

  t.is(result.status, ECustomEdgeStatus.Yellow)
  t.is(result.messages.length, 1)
})


test('returns Green status if validations are valid', t => {
  const config = {
    applets: {
      irs_record_point: {}
    },
    form: {
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
    },
    validations: [{
      "expression": "number_sprayable > 0",
      "message": "Sprayed more with DDT than total",
      "name": "sprayed more with ddt than total",
      "type": "error"
    }]
  }
  // @ts-ignore
  const result = validations_fields_helper(config)

  t.is(result.status, ECustomEdgeStatus.Green)
  t.is(result.messages.length, 0)
})
