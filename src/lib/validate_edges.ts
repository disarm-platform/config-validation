import { get, has } from 'lodash';
import { TConfig } from './config_types/TConfig';
import custom_validations from './custom_edge_validators';
import { THash } from './helpers/path_map';
import { TEdgeDefinition } from './TEdgeDefinition';
import { EEdgeStatus, TEdgeResponse } from './TEdgeResponse';

export function validate_edges(config: TConfig, path_map: THash, edge_definitions: TEdgeDefinition[]): TEdgeResponse[] {
  // For every edge_definition
  const nodes = flat_nodes(config, path_map);
  return edge_definitions.map(edge_definition => {
    return validate_edge(nodes, edge_definition);
  });
}

function validate_edge(nodes: THash, edge_definition: TEdgeDefinition): TEdgeResponse {
  const messages = [];
  let status = EEdgeStatus.Red;

  // Basic checks for existence
  const source_node = get(nodes, edge_definition.source_node_name);
  if (!source_node) { messages.push(`Missing node: ${source_node}`); }

  const target_node = get(nodes, edge_definition.target_node_name);
  if (!target_node) { messages.push(`Missing node: ${target_node}`); }

  const required = edge_definition.required;
  const edge_name = `${source_node}_${target_node}`;

  // if required and missing either node => Red
  // if not required and missing either node => Blue

  // Find and run custom validation
  if (has(custom_validations, edge_name)) {
    const edge_fn: (config: TConfig) => TEdgeResponse = get(custom_validations, edge_name);
    const thing = edge_fn.call(null, nodes);
  } else {
    messages.push(`Cannot find custom validation function ${edge_name}`)
    status = EEdgeStatus.Red
  }

  // Send something back!
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
