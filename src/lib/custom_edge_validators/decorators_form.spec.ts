// tslint:disable:no-expression-statement
import { test } from 'ava';
import { EEdgeStatus } from '../TEdgeResponse';
import { decorators_fields_helper } from '../helpers/decorators_fields_helper';

test('returns Yellow if fields in decorator is not in form', t => {
  const config = {
    "decorators": {
      "status": [
        {
          "red": "number_unsprayable == number_sprayable"
        },
        {
          "green": "number_sprayable == numbersprayed_ddt + numbersprayed_delta"
        }
      ]
    },
    form: {
      "pages": [
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
                  "type": "numeric"
                }
              ]
            },
            {
              "inputType": "number",
              "name": "number_unsprayable",
              "title": "How many unsprayable sleeping structures are in the household/homestead?",
              "type": "text",
              "validators": [
                {
                  "text": "Minimum Value is Zero",
                  "type": "numeric"
                }
              ]
            }
          ],
          "name": "page1"
        }
      ]
    }
  }
  // @ts-ignore
  const result = decorators_fields_helper(config)

  t.is(result.status, EEdgeStatus.Yellow)
  t.is(result.messages.length, 1)
})

test('returns Green if fields in decorator is in form', t => {
  const config = {
    "decorators": {
      "status": [
        {
          "red": "number_unsprayable == number_sprayable"
        },
        {
          "green": "number_sprayable == 1"
        }
      ]
    },
    form: {
      "pages": [
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
                  "type": "numeric"
                }
              ]
            },
            {
              "inputType": "number",
              "name": "number_unsprayable",
              "title": "How many unsprayable sleeping structures are in the household/homestead?",
              "type": "text",
              "validators": [
                {
                  "text": "Minimum Value is Zero",
                  "type": "numeric"
                }
              ]
            }
          ],
          "name": "page1"
        }
      ]
    }
  }
  // @ts-ignore
  const result = decorators_fields_helper(config)

  t.is(result.status, EEdgeStatus.Green)
  t.is(result.messages.length, 0)
})
