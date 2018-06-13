// tslint:disable:no-expression-statement
import { test } from 'ava';
import { determine_unified_response } from './determine_unified_response';
import { EStandardEdgeStatus } from './TStandardEdgeResponse';
import { EUnifiedStatus } from './TUnifiedResponse';

test('returns Red if any Red TStandardEdgeResponses', t => {
  const edge_responses = [{
    edge_name: 'name',
    message: 'message',
    status: EStandardEdgeStatus.Red
  }, {
      edge_name: 'name',
      message: 'message',
      status: EStandardEdgeStatus.Green
  }]
  const result = determine_unified_response(edge_responses)

  t.is(result.status, EUnifiedStatus.Red)
  t.is(result.message, 'Failed')
})

test('returns Green if all Green TStandardEdgeResponses', t => {
  const edge_responses = [{
    edge_name: 'name',
    message: 'message',
    status: EStandardEdgeStatus.Green
  }, {
    edge_name: 'name',
    message: 'message',
    status: EStandardEdgeStatus.Green
  }]
  const result = determine_unified_response(edge_responses)

  t.is(result.status, EUnifiedStatus.Green)
  t.is(result.message, 'All passed')
})

test('returns Green if Green and Blue TStandardEdgeResponses', t => {
  const edge_responses = [{
    edge_name: 'name',
    message: 'message',
    status: EStandardEdgeStatus.Blue
  }, {
    edge_name: 'name',
    message: 'message',
    status: EStandardEdgeStatus.Green
  }]
  const result = determine_unified_response(edge_responses)

  t.is(result.status, EUnifiedStatus.Green)
  t.is(result.message, 'Passed with some optional edges')
})