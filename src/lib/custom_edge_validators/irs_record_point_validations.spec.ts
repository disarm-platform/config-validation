// tslint:disable:no-expression-statement
import { test } from 'ava';
import { EEdgeStatus } from '../TEdgeResponse';
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

test('returns Green if validations', t => {
  const config = {
    applets: {
      irs_record_point: {}
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

  t.is(result.status, EEdgeStatus.Green)
  t.is(result.messages.length, 0)
  
})