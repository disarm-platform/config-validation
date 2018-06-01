// tslint:disable:no-expression-statement
import { test } from 'ava';
import { TDecorators } from '../../definitions/TDecorators';
import { get_all_field_names, get_decorator_field_names } from './fields_helper';

test('get_decorator_field_names returns empty array if no decorators', t => {
  const decorators: TDecorators = {}
  const fields = get_decorator_field_names(decorators)

  t.is(fields.length, 0)
})


test('get_decorator_field_names returns number of decorators', t => {
  const decorators : TDecorators = {
    "status": [
      {
        "red": "numbersprayed_ddt + numbersprayed_delta == 0"
      },
      {
        "yellow": "0 < (numbersprayed_ddt + numbersprayed_delta) and (numbersprayed_ddt + numbersprayed_delta) < number_sprayable"
      },
      {
        "green": "number_sprayable == numbersprayed_ddt + numbersprayed_delta"
      }
    ]
  }
  const fields = get_decorator_field_names(decorators)

  t.is(fields.length, 1)
  t.is(fields[0], 'status')
})

test('get_all_field_names returns empty array when no decorators and no form pages', t => {
  const config = {
    decorators: {},
    form: {}
  }

  // @ts-ignore
  const fields = get_all_field_names(config)

  t.is(fields.length, 0)
})

test('get_all_field_names returns form field names and decorator names', t => {
  const config = {
    decorators: {
      "status": [
        {
          "red": "numbersprayed_ddt + numbersprayed_delta == 0"
        },
        {
          "yellow": "0 < (numbersprayed_ddt + numbersprayed_delta) and (numbersprayed_ddt + numbersprayed_delta) < number_sprayable"
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
  const fields = get_all_field_names(config)
  const expected = [
    'number_sprayable',
    'number_unsprayable',
    'status'
  ]
  
  t.is(fields.length, 3)
  t.deepEqual(fields, expected)
})