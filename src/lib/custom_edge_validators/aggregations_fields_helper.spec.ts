// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TAggregations } from '../config_types/TAggregations';
import { TConfig } from '../config_types/TConfig';
import { TDecorators } from '../config_types/TDecorators';
import { TForm } from '../config_types/TForm';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { aggregations_fields_helper } from './aggregations_fields_helper';

test('returns Green status if field in aggregations is in form', t => {
  const aggregations: TAggregations = [{
    "name": "number of rooms sprayed",
    "numerator_expr": "number_sprayed"
  }]; 

  const form: TForm = {
    pages: [
      {
        "elements": [
          {
            "inputType": "number",
            "isRequired": true,
            "name": "number_sprayed",
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

  const config = {
    aggregations,
    decorators: {},
    form
  }

  const result = aggregations_fields_helper(config as TConfig)

  t.is(result[0].status, ECustomEdgeStatus.Green)
})

test('returns Red status if aggregation field not present in form', t => {

  const form: TForm = {
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
  const aggregations: TAggregations = [{
    "name": "number of rooms sprayed",
    "numerator_expr": "number_sprayed"
  }]

  const config = {
    aggregations,
    decorators: {},
    form
  }
  
  const result = aggregations_fields_helper(config as TConfig)

  t.is(result.length, 1)
  t.is(result[0].status, ECustomEdgeStatus.Red)
})

test('returns Yellow status if aggregation field not present in decorators', t => {
  const form: TForm = {
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
          }
        ],
        "name": "page1"
      }
    ]
  }

  const aggregations: TAggregations = [{
    "name": "number of rooms sprayable",
    "numerator_expr": "number_sprayable + not_in_decorator"
  }]

  const decorators: TDecorators = {
    'decorator_name': []    
  }

  const config = {
    aggregations,
    decorators,
    form,
  }
  
  const result = aggregations_fields_helper(config as TConfig)

  t.is(result.length, 2)
  t.is(result[1].status, ECustomEdgeStatus.Red)
})

test('returns Green status if aggregation fields exist', t => {
  const aggregations: TAggregations = [{
    "name": "number of rooms sprayable",
    "numerator_expr": "number_sprayable"
  }]

  const form: TForm = {
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

  const config = {
    aggregations,
    decorators: {},
    form,
  }
  
  const result = aggregations_fields_helper(config as TConfig)

  t.is(result.length, 1)
  t.is(result[0].status, ECustomEdgeStatus.Green)
})
