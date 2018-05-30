// tslint:disable:no-expression-statement
import { test } from 'ava';
import { EEdgeStatus } from '../EdgeResponse';
import { irs_monitor_presenters } from './irs_monitor_presenters';

test('returns Blue status if no irs_monitor', t => {
  const config = {
    applets: {}
  }
  // @ts-ignore
  const result = irs_monitor_presenters(config)

  t.is(result.status, EEdgeStatus.Blue)
  t.is(result.messages.length, 0)
})
