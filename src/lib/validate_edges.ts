import { TConfig } from './config_types/TConfig';
import { CustomEdgeValidators } from './custom_edge_validators/index';
import { mapped_nodes, MappedNode } from './flatten_nodes';
import { TPathMap } from './helper_functions/path_mapping';
import { ECustomEdgeStatus, TCustomEdgeResponses } from './TCustomEdgeResponse';
import { TEdgeDefinition } from './TEdgeDefinition';
import { ENodeResponseStatus, TNodeResponse } from './TNodeResponse';
import { EStandardEdgeStatus, TStandardEdgeResponse } from './TStandardEdgeResponse';

export function validate_edges(config: TConfig, path_map: TPathMap[], edge_definitions: TEdgeDefinition[]): TStandardEdgeResponse[] {
  // create helpers
  const nodes = mapped_nodes(config, path_map);

  // For every edge_definition do all the validation
  return edge_definitions.map(edge_definition => {
    return validate_edge(config, nodes, edge_definition);
  });
}

function validate_edge(config: TConfig, nodes: MappedNode[], edge_definition: TEdgeDefinition): TStandardEdgeResponse {
  let nodes_exist: TNodeResponse;

  // Tell me about this Edge
  const edge_required = edge_definition.required;
  const edge_name = `${edge_definition.source_node_name}_${edge_definition.target_node_name}`;

  // Basic checks for Node existence
  const source_node = nodes.find(n => n.name === edge_definition.source_node_name);
  const target_node = nodes.find(n => n.name === edge_definition.target_node_name);

  if (!source_node || !target_node) {
    nodes_exist = {
      message: 'Missing source or target node',
      status: ENodeResponseStatus.Red
    }
    return determine_edge_result(edge_name, nodes_exist, edge_required)
  } 
  
  nodes_exist = {
    message: 'Both nodes exist',
    status: ENodeResponseStatus.Green
  }
  
  // Find and run the custom edge validation
  if (!(edge_name in CustomEdgeValidators)) {
    return {
      edge_name,
      message: `Cannot find ${edge_name} edge`,
      status: EStandardEdgeStatus.Red,
    }
  }
  
  const edge_fn = CustomEdgeValidators[edge_name]
  const custom_edge_responses = edge_fn(config);

  return determine_edge_result(edge_name, nodes_exist, edge_required, custom_edge_responses)
}

export function determine_edge_result(edge_name: string, node_response: TNodeResponse, edge_required: boolean, custom_edge_responses?: TCustomEdgeResponses, ): TStandardEdgeResponse {
  // Create a default response in case none of the other cases match.
  const response = {edge_name, status: EStandardEdgeStatus.Red, message: 'Default response - not caught by any other cases'}

  // All the tools
  const edge_optional = !edge_required
  const nodes_pass = node_response.status === ENodeResponseStatus.Green
  const nodes_fail = !nodes_pass
  const edge_passes = custom_edge_responses && custom_edge_responses.every(r => r.status === ECustomEdgeStatus.Green)
  const edge_fails  = !edge_passes

  // There are 3 binary variables (required, nodes pass, edge passes), so 8 cases
  // 2 cases are dealt with by short-circuiting if nodes fail
  // Leaves 6 cases to deal with explicitly
  if (nodes_fail && edge_required) {
    return {
      ...response, 
      message: 'Failed - some missing node' ,
      status: EStandardEdgeStatus.Red
    }
  }

  if (nodes_fail && edge_optional) {
    return {
      ...response, 
      message: 'One or more missing nodes, but edge not required',
      status: EStandardEdgeStatus.Blue
    }
  }

  if (nodes_pass && edge_required && edge_passes) {
    return {
      ...response, 
      message: 'Required edge, nodes present and edge passes',
      status: EStandardEdgeStatus.Green
    }
  }

  if (nodes_pass && edge_optional && edge_passes) {
    return {
      ...response, 
      message: 'Optional edge, nodes present and edge passes',
      status: EStandardEdgeStatus.Green
    }
  }

  if (nodes_pass && edge_required && edge_fails) {
    return {
      ...response, 
      message: 'Required edge, nodes present and edge fails',
      status: EStandardEdgeStatus.Red
    }
  }

  if (nodes_pass && edge_optional && edge_fails) {
    return {
      ...response, 
      message: 'Optional edge, nodes present and edge fails',
      status: EStandardEdgeStatus.Red
    }
  }

  // Only used for fallthrough
  return response
}
