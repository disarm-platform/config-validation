import { get, has } from 'lodash';
import { TConfig } from './config_types/TConfig';
import { THash } from './helpers/path_map';
import { EEdgeStatus, TEdgeResponse } from './TEdgeResponse';
import { TEdgeDefinition } from './TEdgeDefinition';
import custom_validations from './custom_edge_validators'

export function validate_edges(config: TConfig, path_map: THash, edge_definitions: TEdgeDefinition[]): TEdgeResponse[] {
  // For every edge_definition
  const nodes = flat_nodes(config, path_map);
  return edge_definitions.map(edge_definition => {
    return validate_edge(nodes, edge_definition);
  });
}

function validate_edge(nodes: THash, edge_definition: TEdgeDefinition): TEdgeResponse {
  const messages = [];

  // Basic checks for existence
  const source_node = get(nodes, edge_definition.source_node_name);
  const target_node = get(nodes, edge_definition.target_node_name);
  const required = edge_definition.required;
  const edge_name = `${source_node}_${target_node}`

  if (!source_node) messages.push(`Missing node: ${source_node}`);
  if (!target_node) messages.push(`Missing node: ${target_node}`);

  // if required and missing either node => Red
  // if not required and missing either node => Blue

  // Find and run custom validation
  if (has(custom_validations, edge_name)) {
    console.log('Has custom validation for ', edge_name)
    const edge_result = custom_validations[edge_name](source_node, target_node)
  }

  //
  return {
    messages: [],
    status: EEdgeStatus.Green
  };
}

function flat_nodes(config: TConfig, path_map: THash): THash {
  return Object.keys(path_map).reduce((acc, key) => {
    acc[key] = get(config, path_map.key, 'unknown');
    return acc;
  }, {} as THash);
}
