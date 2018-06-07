// tslint:disable:no-expression-statement
import { test } from 'ava';
import { get_form_elements } from './form_helpers';

test('get_form_elements returns empty array if form has pages property', t => {
  // @ts-ignore
  const elements = get_form_elements({})

  t.is(elements.length, 0)
})

test('get_form_elements returns empty array if form has no pages', t => {
  const elements = get_form_elements({pages: []})

  t.is(elements.length, 0)
})

test('get_form_elements returns a FormElement for each element', t => {
  const form = {
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
  const actual = get_form_elements(form)
  const expected = [
    {
      name: 'number_sprayable',
      page: 0,
      type: 'text'
    },
    {
      name: 'number_unsprayable',
      page: 0,
      type: 'text'
    }
  ]

  t.is(actual.length, 2)
  t.deepEqual(actual, expected)
})