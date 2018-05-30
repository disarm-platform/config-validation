// tslint:disable:no-expression-statement
import { test } from 'ava';
import { EdgeStatus } from '../EdgeResponse';
import { irs_record_point_form } from './irs_record_point_form';

test('returns Blue status if no irs_record_point', t => {
  const config = {
    applets: {}
  }
  // @ts-ignore
  const result = irs_record_point_form(config)

  t.is(result.status, EdgeStatus.Blue)
  t.is(result.messages.length, 0)
})

test('returns Yellow status if form is missing', t => {
  const config = {
    applets: {
      irs_record_point: {}
    }
  }
  // @ts-ignore
  const result = irs_record_point_form(config)

  t.is(result.status, EdgeStatus.Yellow)
  t.is(result.messages.length, 1)
})


test('returns Yellow status if form has no pages', t => {
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

  t.is(result.status, EdgeStatus.Yellow)
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

  t.is(result.status, EdgeStatus.Green)
  t.is(result.messages.length, 0)
})