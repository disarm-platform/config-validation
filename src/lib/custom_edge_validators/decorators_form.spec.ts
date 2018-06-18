// // tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { TDecorators } from '../config_types/TDecorators';
import { TForm } from '../config_types/TForm';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { decorators_form } from './decorators_form';

test('returns Red if fields in decorator is not in form', t => {
  const decorators: TDecorators = {
    status: [
      {
        red: 'number_unsprayable == number_sprayable'
      },
      {
        green: 'number_sprayable == numbersprayed_ddt + numbersprayed_delta'
      }
    ]
  };

  const form: TForm = {
    pages: [
      {
        elements: [
          {
            inputType: 'number',
            isRequired: true,
            name: 'number_sprayable',
            title: 'How many sprayable structures in the household/homestead?',
            type: 'text',
            validators: [
              {
                text: 'Minimum Value is Zero',
                type: 'numeric'
              }
            ]
          },
          {
            inputType: 'number',
            name: 'number_unsprayable',
            title:
              'How many unsprayable sleeping structures are in the household/homestead?',
            type: 'text',
            validators: [
              {
                text: 'Minimum Value is Zero',
                type: 'numeric'
              }
            ]
          }
        ],
        name: 'page1'
      }
    ]
  };

  const config = {
    decorators,
    form
  };

  const result = decorators_form(config as TConfig);

  t.is(result.length, 4);
  t.is(result[0].status, ECustomEdgeStatus.Green);
  t.is(result[1].status, ECustomEdgeStatus.Green);
  t.is(result[2].status, ECustomEdgeStatus.Red);
  t.is(result[3].status, ECustomEdgeStatus.Red);
});

test('returns Green if fields in decorator is in form', t => {
  const decorators: TDecorators = {
    status: [
      {
        red: 'number_unsprayable == number_sprayable'
      },
      {
        green: 'number_sprayable == 1'
      }
    ]
  };

  const form: TForm = {
    pages: [
      {
        elements: [
          {
            inputType: 'number',
            isRequired: true,
            name: 'number_sprayable',
            title: 'How many sprayable structures in the household/homestead?',
            type: 'text',
            validators: [
              {
                text: 'Minimum Value is Zero',
                type: 'numeric'
              }
            ]
          },
          {
            inputType: 'number',
            name: 'number_unsprayable',
            title:
              'How many unsprayable sleeping structures are in the household/homestead?',
            type: 'text',
            validators: [
              {
                text: 'Minimum Value is Zero',
                type: 'numeric'
              }
            ]
          }
        ],
        name: 'page1'
      }
    ]
  };

  const config = {
    decorators,
    form
  };

  const result = decorators_form(config as TConfig);

  t.is(result.length, 2);
  t.is(result[0].status, ECustomEdgeStatus.Green);
  t.is(result[1].status, ECustomEdgeStatus.Green);
});
