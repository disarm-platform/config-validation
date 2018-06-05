import { get } from 'lodash';
import { TConfig } from './config_types/TConfig';
import custom_validations from './custom_edge_validators/index';
import { mapped_nodes, MappedNode } from './flatten_nodes';
import { THelpers } from './helpers/create_helper_objects';
import { create_helper_objects } from './helpers/index';
import { TPathMap } from './helpers/path_mapping';
import { ECustomEdgeStatus, TCustomEdgeResponses } from './TCustomEdgeResponse';
import { TEdgeDefinition } from './TEdgeDefinition';
import { ENodeResponseStatus, TNodeResponse } from './TNodeResponse';
import { EStandardEdgeStatus, TStandardEdgeResponse } from './TStandardEdgeResponse';

export function validate_edges(config: TConfig, path_map: TPathMap[], edge_definitions: TEdgeDefinition[]): TStandardEdgeResponse[] {
  // create helpers
  const helper_objects = create_helper_objects(config); // TODO: Remove any pure functions from here
  const nodes = mapped_nodes(config, path_map);

  // For every edge_definition do all the validation
  return edge_definitions.map(edge_definition => {
    return validate_edge(nodes, edge_definition, helper_objects);
  });
}

function validate_edge(nodes: MappedNode[], edge_definition: TEdgeDefinition, helpers: THelpers): TStandardEdgeResponse {
  const node_responses: TNodeResponse[] = [];

  // Basic checks for Node existence
  const source_node = nodes.find(n => n.name === edge_definition.source_node_name);
  const target_node = nodes.find(n => n.name === edge_definition.target_node_name);

  // Tell me about this Edge
  const edge_required = edge_definition.required;
  const edge_name = `${source_node.name}_${target_node.name}`;

  // Find and run the custom edge validation
  let custom_edge_responses
  if (edge_name in custom_validations) {
    const edge_fn: (source_node: object, target_node: object, helpers: THelpers) => TCustomEdgeResponses = get(custom_validations, edge_name);
    custom_edge_responses = edge_fn(source_node, target_node, helpers);
  } else {
    return {
      edge_name,
      message: `Cannot find ${edge_name} edge`,
      status: EStandardEdgeStatus.Red,
    }
  }

  return determine_edge_result(edge_name, node_responses, edge_required, custom_edge_responses)
}

function determine_edge_result(edge_name: string, node_responses: TNodeResponse[], edge_required: boolean, custom_edge_responses?: TCustomEdgeResponses, ): TStandardEdgeResponse {
  // Create a default response in case none of the other cases match.
  const response = {edge_name, status: EStandardEdgeStatus.Red, message: 'Default response - not caught by any other cases'}

  // All the tools
  const edge_optional = !edge_required
  const nodes_pass = node_responses.every(r => r.status === ENodeResponseStatus.Green)
  const nodes_fail = !nodes_pass
  const edge_passes = custom_edge_responses && custom_edge_responses.every(r => r.status === ECustomEdgeStatus.Green)
  const edge_fails  = !edge_passes

  // There are 3 binary variables (required, nodes pass, edge passes), so 8 cases
  // 2 cases are dealt with by short-circuiting if nodes fail
  // Leaves 6 cases to deal with explicitly
  if (nodes_fail && edge_required) {
    return {...response, status: EStandardEdgeStatus.Red, message: 'Failed - some missing node' }
  }
  if (nodes_fail && edge_optional) {
    return {...response, status: EStandardEdgeStatus.Blue, message: 'One or more missing nodes, but edge not required' }
  }
  if (nodes_pass && edge_required && edge_passes) {
    return {...response, status: EStandardEdgeStatus.Green, message: 'Required edge, nodes present and edge passes' }
  }
  if (nodes_pass && edge_optional && edge_passes) {
    return {...response, status: EStandardEdgeStatus.Green, message: 'Optional edge, nodes present and edge passes' }
  }
  if (nodes_pass && edge_required && edge_fails) {
    return {...response, status: EStandardEdgeStatus.Red, message: 'Required edge, nodes present and edge fails' }
  }
  if (nodes_pass && edge_optional && edge_fails) {
    return {...response, status: EStandardEdgeStatus.Red, message: 'Optional edge, nodes present and edge fails' }
  }

  // Only used for fallthrough
  return response
}