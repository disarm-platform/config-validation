// tslint:disable:no-expression-statement
import { test } from 'ava';
import { EEdgeStatus } from '../EdgeResponse';
import { irs_record_point_validations } from './irs_record_point_validations';

test('returns Blue status if no irs_record_point', t => {
  const config = {
    applets: {}
  }
  // @ts-ignore
  const result = irs_record_point_validations(config) 

  t.is(result.status, EEdgeStatus.Blue)
  t.is(result.messages.length, 0)
})

test('returns Blue status if no validations', t => {
  const config = {
    applets: {
      irs_record_point: {}
    },
    validations: []
  }
  // @ts-ignore
  const result = irs_record_point_validations(config)

  t.is(result.status, EEdgeStatus.Blue)
  t.is(result.messages.length, 0)
})

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
  const result = irs_record_point_validations(config)

  t.is(result.status, EEdgeStatus.Yellow)
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
  const result = irs_record_point_validations(config)

  t.is(result.status, EEdgeStatus.Green)
  t.is(result.messages.length, 0)
})