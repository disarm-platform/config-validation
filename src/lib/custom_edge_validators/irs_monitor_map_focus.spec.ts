// tslint:disable:no-expression-statement
import { test } from 'ava';
import { EEdgeStatus } from '../TEdgeResponse';
import { irs_monitor_map_focus } from './irs_monitor_map_focus';

test('returns Blue status if no irs_monitor', t => {
  const config = {
    applets: {}
  }
  // @ts-ignore
  const result = irs_monitor_map_focus(config)

  t.is(result.status, EEdgeStatus.Blue)
  t.is(result.messages.length, 0)
})

test('returns Blue status if map_focus is missing', t => {
  const config = {
    applets: {
      irs_monitor: {}
    }
  }
  // @ts-ignore
  const result = irs_monitor_map_focus(config)

  t.is(result.status, EEdgeStatus.Blue)
  t.is(result.messages.length, 0)
})

test('returns Green status if map focus is there', t => {
  const config = {
    applets: {
      irs_monitor: {}
    },
    map_focus: {
      
    }
  }
  // @ts-ignore
  const result = irs_monitor_map_focus(config)

  t.is(result.status, EEdgeStatus.Green)
  t.is(result.messages.length, 0)
})