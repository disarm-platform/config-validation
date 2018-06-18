// tslint:disable:no-expression-statement
import { test } from 'ava';
import { TConfig } from '../config_types/TConfig';
import { TForm } from '../config_types/TForm';
import { TValidations } from '../config_types/TValidations';
import { ECustomEdgeStatus } from '../TCustomEdgeResponse';
import { validations_fields_helper } from './validations_fields_helper';

test('returns Red status if validations expression form field is not in form', t => {
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
          }
        ],
        name: 'page1'
      }
    ]
  };
  const validations: TValidations = [
    {
      expression: 'numbersprayed_ddt <= number_sprayable',
      message: 'Sprayed more with DDT than total',
      name: 'sprayed more with ddt than total',
      type: 'error'
    }
  ];

  const config = {
    decorators: {},
    form,
    validations
  };

  const result = validations_fields_helper(config as TConfig);

  t.is(result.length, 2);

  t.is(result[0].status, ECustomEdgeStatus.Red);

  t.is(result[1].status, ECustomEdgeStatus.Green);
});

test('returns Green status if validations are valid', t => {
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
          }
        ],
        name: 'page1'
      }
    ]
  };
  const validations: TValidations = [
    {
      expression: 'number_sprayable > 0',
      message: 'Sprayed more with DDT than total',
      name: 'sprayed more with ddt than total',
      type: 'error'
    }
  ];

  const config = { form, validations, decorators: {} };

  const result = validations_fields_helper(config as TConfig);

  t.is(result.length, 1);

  t.is(result[0].status, ECustomEdgeStatus.Green);
});
