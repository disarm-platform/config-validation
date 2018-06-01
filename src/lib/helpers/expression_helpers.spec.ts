// tslint:disable:no-expression-statement
import { test } from 'ava';
import { TValidation } from '../../definitions/TValidations';
import { get_expresion_variables, get_form_fields_for_validations } from './expression_helpers';

test('get_validation_variables returns empty array if expression has no variables', t => {
  const variables = get_expresion_variables('')

  t.is(variables.length, 0)
})

test('get_validation_variables returns one variable if expression has one variable', t => {
  const variables = get_expresion_variables('a')

  t.is(variables.length, 1)
})

test('get_validation_variables returns two variables if expression has two variables', t => {
  const variables = get_expresion_variables('a - b')

  t.is(variables.length, 2)
})

test('get_validation_variables returns empty array', t => {
  const validations : TValidation[] = []
  const variables = get_form_fields_for_validations(validations)

  t.is(variables.length, 0)
})

test('get_validation_variables returns two variables', t => {
  const validations: TValidation[] = [
    {
      expression: 'a - b',
      message: '',
      name: '',
      type: ''
    }
  ]
  const variables = get_form_fields_for_validations(validations)

  t.is(variables.length, 2)
})

test('get_validation_variables returns four variables', t => {
  const validations: TValidation[] = [
    {
      expression: 'a - b',
      message: '',
      name: '',
      type: ''
    },
    {
      expression: 'd - c',
      message: '',
      name: '',
      type: ''
    }
  ]
  const variables = get_form_fields_for_validations(validations)

  t.is(variables.length, 4)
})

