// tslint:disable:no-expression-statement
import { test } from 'ava';
import { EdgeStatus } from '../EdgeResponse';
import { irs_record_point_location_selection } from './irs_record_point_location_selection';

test('returns Blue status if no irs_record_point', t => {
  const config = {
    applets: {}
  }
  // @ts-ignore
  const result = irs_record_point_location_selection(config)

  t.is(result.status, EdgeStatus.Blue)
  t.is(result.messages.length, 0)
})

test('returns Yellow status if location_selection is missing', t => {
  const config = {
    applets: {
      irs_record_point: {}
    }
  }
  // @ts-ignore
  const result = irs_record_point_location_selection(config)

  t.is(result.status, EdgeStatus.Yellow)
  t.is(result.messages.length, 1)
})


test('returns Yellow status if location_selection is an object with no keys', t => {
  const config = {
    applets: {
      irs_record_point: {}
    },
    location_selection: {}
  }
  // @ts-ignore
  const result = irs_record_point_location_selection(config)

  t.is(result.status, EdgeStatus.Yellow)
  t.is(result.messages.length, 1)
})

test('returns Green status if location_selection is there', t => {
  const config = {
    applets: {
      irs_record_point: {}
    },
    location_selection: {
      villages: []
    }
  }
  // @ts-ignore
  const result = irs_record_point_location_selection(config)

  t.is(result.status, EdgeStatus.Green)
  t.is(result.messages.length, 0)
})