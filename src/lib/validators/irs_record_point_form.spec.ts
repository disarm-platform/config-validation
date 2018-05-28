// tslint:disable:no-expression-statement
import { test } from 'ava';
import { EEdgeStatus } from '../EdgeResponse';
import { irs_record_point_form } from './irs_record_point_form';

test('returns Blue status if no irs_record_point', t => {
  const config = {
    applets: {}
  }
  // @ts-ignore
  const result = irs_record_point_form(config)

  t.is(result.status, EEdgeStatus.Blue)
  t.is(result.messages.length, 0)
})

test('returns Red status if form is missing', t => {
  const config = {
    applets: {
      irs_record_point: {}
    }
  }
  // @ts-ignore
  const result = irs_record_point_form(config)

  t.is(result.status, EEdgeStatus.Red)
  t.is(result.messages.length, 1)
})


test('returns Red status if form has no pages', t => {
  const config = {
    applets: {
      irs_record_point: {}
    },
    form: {
      pages: []
    }
  }
  // @ts-ignore
  const result = irs_record_point_form(config)

  t.is(result.status, EEdgeStatus.Red)
  t.is(result.messages.length, 1)
})

test('returns Green status if form is there and has pages', t => {
  const config = {
    applets: {
      irs_record_point: {}
    },
    form: {
      pages: [{
        name: 'element_name'
      }]
    }
  }
  // @ts-ignore
  const result = irs_record_point_form(config)

  t.is(result.status, EEdgeStatus.Green)
  t.is(result.messages.length, 0)
})