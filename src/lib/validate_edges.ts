import { flatten, get, has } from 'lodash';
import { TConfig } from './config_types/TConfig';
import custom_validations from './custom_edge_validators';
import { TPathMap } from './helpers/path_mapping';
import { ECustomEdgeStatus, TCustomEdgeResponse } from './TCustomEdgeResponse';
import { TEdgeDefinition } from './TEdgeDefinition';
import { EStandardEdgeStatus, TStandardEdgeResponse } from './TStandardEdgeResponse';

export function validate_edges(config: TConfig, path_map: TPathMap[], edge_definitions: TEdgeDefinition[]): TStandardEdgeResponse[] {
  // For every edge_definition
  const nodes = mapped_nodes(config, path_map);
  return edge_definitions.map(edge_definition => {
    return validate_edge(config, nodes, edge_definition);
  });
}

function validate_edge(config: TConfig, nodes: MappedNode[], edge_definition: TEdgeDefinition): TStandardEdgeResponse {
  let messages = [];
  let status = EStandardEdgeStatus.Red;

  // Basic checks for existence
  const source_node = get(nodes, edge_definition.source_node_name);
  if (!source_node) {
    messages.push(`Missing node: ${source_node}`);
  }

  const target_node = get(nodes, edge_definition.target_node_name);
  if (!target_node) {
    messages.push(`Missing node: ${target_node}`);
  }

  const required = edge_definition.required;
  const edge_name = `${source_node}_${target_node}`;

  // if required and missing either node => Red
  // if not required and missing either node => Blue

  // Find and run custom validation
  if (has(custom_validations, edge_name)) {
    const edge_fn: (source_node: object, target_node: object) => TCustomEdgeResponse = get(custom_validations, edge_name);
    const custom_edge_response = edge_fn(source_node, target_node);
    messages = messages.concat(custom_edge_response.messages);
    if (custom_edge_response.status === ECustomEdgeStatus.Red) {
      status = EStandardEdgeStatus.Red;
    }
  } else {
    messages.push(`Cannot find custom validation function ${edge_name}`);
    status = EStandardEdgeStatus.Red;
  }

  // Send something back!
  return {
    messages,
    status
  };
}

interface MappedNode {
  name: string;
  node: object;
}

function mapped_nodes(config: TConfig, path_map: TPathMap[]): MappedNode[] {
  return path_map.map(el => {
    return {
      name: el.name,
      node: get(config, el.path)
    }
  })
}
