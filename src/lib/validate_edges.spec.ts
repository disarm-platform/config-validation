// tslint:disable:no-expression-statement
import { test } from 'ava';
import { ECustomEdgeStatus, TCustomEdgeResponse } from './TCustomEdgeResponse';
import { TEdgeDefinition } from './TEdgeDefinition';
import { ENodeResponseStatus, TNodeResponse } from './TNodeResponse';
import { EStandardEdgeStatus } from './TStandardEdgeResponse';
import { determine_edge_result } from './validate_edges';

test('returns Red if nodes fail and the edge is required', t => {
  const node_response: TNodeResponse = {
    message: '',
    status: ENodeResponseStatus.Red
  };
  const edge_required = true;
  const custom_edge_responses: TCustomEdgeResponse[] = [];
  const edge_definition: TEdgeDefinition = {
    relationship_hint: '',
    required: true,
    source_node_name: 'edge',
    target_node_name: 'name'
  };
  const result = determine_edge_result(
    edge_definition,
    node_response,
    edge_required,
    custom_edge_responses
  );

  t.is(result.status, EStandardEdgeStatus.Red);
  t.true(result.message.startsWith('Failed - some missing node'));
});

test('returns Blue if nodes fail and the edge is optional', t => {
  const node_response: TNodeResponse = {
    message: '',
    status: ENodeResponseStatus.Red
  };
  const edge_required = false;
  const custom_edge_responses: TCustomEdgeResponse[] = [];
  const edge_definition: TEdgeDefinition = {
    relationship_hint: '',
    required: true,
    source_node_name: 'edge',
    target_node_name: 'name'
  };
  const result = determine_edge_result(
    edge_definition,
    node_response,
    edge_required,
    custom_edge_responses
  );

  t.is(result.status, EStandardEdgeStatus.Blue);
  t.true(
    result.message.startsWith(
      'One or more missing nodes, but edge not required'
    )
  );
});

test('returns Green if nodes pass and the edge is required and edges pass', t => {
  const node_response: TNodeResponse = {
    message: '',
    status: ENodeResponseStatus.Green
  };
  const edge_required = true;
  const custom_edge_responses: TCustomEdgeResponse[] = [
    {
      message: '',
      status: ECustomEdgeStatus.Green
    }
  ];

  const edge_definition: TEdgeDefinition = {
    relationship_hint: '',
    required: true,
    source_node_name: 'edge',
    target_node_name: 'name'
  };

  const result = determine_edge_result(
    edge_definition,
    node_response,
    edge_required,
    custom_edge_responses
  );

  t.is(result.status, EStandardEdgeStatus.Green);
  t.true(
    result.message.startsWith('Required edge, nodes present and edge passes')
  );
});

test('returns Green if nodes pass and the edge is optional and edges pass', t => {
  const node_response: TNodeResponse = {
    message: '',
    status: ENodeResponseStatus.Green
  };
  const edge_required = false;
  const custom_edge_responses: TCustomEdgeResponse[] = [
    {
      message: '',
      status: ECustomEdgeStatus.Green
    }
  ];

  const edge_definition: TEdgeDefinition = {
    relationship_hint: '',
    required: true,
    source_node_name: 'edge',
    target_node_name: 'name'
  };

  const result = determine_edge_result(
    edge_definition,
    node_response,
    edge_required,
    custom_edge_responses
  );

  t.is(result.status, EStandardEdgeStatus.Green);
  t.true(
    result.message.startsWith('Optional edge, nodes present and edge passes')
  );
});

test('returns Red if nodes pass and the edge is required and edges fail', t => {
  const node_response: TNodeResponse = {
    message: '',
    status: ENodeResponseStatus.Green
  };
  const edge_required = true;
  const custom_edge_responses: TCustomEdgeResponse[] = [
    {
      message: '',
      status: ECustomEdgeStatus.Red
    }
  ];

  const edge_definition: TEdgeDefinition = {
    relationship_hint: '',
    required: true,
    source_node_name: 'edge',
    target_node_name: 'name'
  };

  const result = determine_edge_result(
    edge_definition,
    node_response,
    edge_required,
    custom_edge_responses
  );

  t.is(result.status, EStandardEdgeStatus.Red);
  t.true(
    result.message.startsWith('Required edge, nodes present and edge fails')
  );
});

test('returns Red if nodes pass and the edge is optional and edges fail', t => {
  const node_response: TNodeResponse = {
    message: '',
    status: ENodeResponseStatus.Green
  };
  const edge_required = false;
  const custom_edge_responses: TCustomEdgeResponse[] = [
    {
      message: '',
      status: ECustomEdgeStatus.Red
    }
  ];

  const edge_definition: TEdgeDefinition = {
    relationship_hint: '',
    required: true,
    source_node_name: 'edge',
    target_node_name: 'name'
  };

  const result = determine_edge_result(
    edge_definition,
    node_response,
    edge_required,
    custom_edge_responses
  );

  t.is(result.status, EStandardEdgeStatus.Red);
  t.true(
    result.message.startsWith('Optional edge, nodes present and edge fails')
  );
});
