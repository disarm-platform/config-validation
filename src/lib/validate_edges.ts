import { flatten, get, has } from 'lodash';
import { TConfig } from './config_types/TConfig';
import custom_validations from './custom_edge_validators';
import {create_helpers} from './helpers';
import { TPathMap } from './helpers/path_mapping';
import { ECustomEdgeStatus, TCustomEdgeResponse } from './TCustomEdgeResponse';
import { TEdgeDefinition } from './TEdgeDefinition';
import { EStandardEdgeStatus, TStandardEdgeResponse } from './TStandardEdgeResponse';
import { THelpers } from './helpers/create_helpers';

export function validate_edges(config: TConfig, path_map: TPathMap[], edge_definitions: TEdgeDefinition[]): TStandardEdgeResponse[] {
  // For every edge_definition
  // create helpers
  const helpers = create_helpers(config)
  const nodes = mapped_nodes(config, path_map);
  
  return edge_definitions.map(edge_definition => {
    return validate_edge(config, nodes, edge_definition, helpers);
  });
}

function validate_edge(config: TConfig, nodes: MappedNode[], edge_definition: TEdgeDefinition, helpers: THelpers): TStandardEdgeResponse {
  const response: TStandardEdgeResponse = [];
  let messages = [];
  let status = EStandardEdgeStatus.Red;

  // Basic checks for existence
  const source_node = get(nodes, edge_definition.source_node_name);
  if (!source_node) {
    messages.push(`Missing source node: ${source_node}`);
  }

  const target_node = get(nodes, edge_definition.target_node_name);
  if (!target_node) {
    messages.push(`Missing target node: ${target_node}`);
  }

  const required = edge_definition.required;
  const edge_name = `${source_node}_${target_node}`

  // if required and missing either node => Red
  if (edge_definition.required && (!source_node || !target_node)) {
    return {
      messages: ['Some array of messages'],
      status: EStandardEdgeStatus.Red
    }
  }
  // if not required and missing either node => Blue
  if (!edge_definition.required && (!source_node || !target_node)) {
    return {
      messages: ['Something missing, but edge not required anyway'],
      status: EStandardEdgeStatus.Blue
    }
  }

  // Find and run custom validation
  if (edge_name in custom_validations) {
    const edge_fn: (source_node: object, target_node: object, helpers: THelpers) => TCustomEdgeResponse = get(custom_validations, edge_name);

    const custom_edge_response = edge_fn(source_node, target_node, helpers);

    messages = messages.concat(custom_edge_response.messages);
    if (custom_edge_response.status === ECustomEdgeStatus.Red) {
      status = EStandardEdgeStatus.Red;
    }
    // TODO: Missing ECustomEdgeStatus.Green case
  } else {
    response.push({
      message: `Cannot find custom validation function ${edge_name}`,
      status: EStandardEdgeStatus.Red
    })
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
