// tslint:disable:no-expression-statement
import { test } from 'ava';
import { EdgeStatus } from '../EdgeResponse';
import { irs_monitor_spatial_hierarchy } from './irs_monitor_spatial_hierarchy';

test('returns Blue if no irs_monitor', t => {
  // @ts-ignore
  const config = {
    applets: {}
  }
  // @ts-ignore
  const result = irs_monitor_spatial_hierarchy(config)

  t.is(result.status, EdgeStatus.Blue)
})

test('returns Yellow if no spatial_hierarchy', t => {
  // @ts-ignore
  const config = {
    applets: {
      irs_monitor: {}
    }
  }
  // @ts-ignore
  const result = irs_monitor_spatial_hierarchy(config)

  t.is(result.status, EdgeStatus.Yellow)
})

test('returns Green if valid', t => {
  // @ts-ignore
  const config = {
    applets: {
      irs_monitor: {}
    },
    spatial_hierarchy: {}
  }
  // @ts-ignore
  const result = irs_monitor_spatial_hierarchy(config)

  t.is(result.status, EdgeStatus.Green)
})
