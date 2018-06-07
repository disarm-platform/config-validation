// tslint:disable:no-expression-statement
import { test } from 'ava';
import { determine_unified_response } from './determine_unified_response';
import { EStandardEdgeStatus, TStandardEdgeResponse } from './TStandardEdgeResponse';
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


test.failing('returns Red if no TStandardEdgeResponses are passed', t => {
  // TODO: Think, .every() returns true for an empty array, so we might want to return early if there are no edge_responses
  const edge_responses: TStandardEdgeResponse[] = []
  const result = determine_unified_response(edge_responses)

  t.is(result.status, EUnifiedStatus.Red)
  t.is(result.message, 'Unknown Unified Status result')
})