import { flatten, get } from 'lodash';
import { TConfig } from './config_types/TConfig';
import custom_validations from './custom_edge_validators/index';
import { create_helper_objects } from './helpers/index';
import { TPathMap } from './helpers/path_mapping';
import { ECustomEdgeStatus, TCustomEdgeResponse, TCustomEdgeResponses } from './TCustomEdgeResponse';
import { TEdgeDefinition } from './TEdgeDefinition';
import { EStandardEdgeStatus, TStandardEdgeResponses } from './TStandardEdgeResponse';
import { THelpers } from './helpers/create_helper_objects';
import { mapped_nodes, MappedNode } from './flatten_nodes';

export function validate_edges(config: TConfig, path_map: TPathMap[], edge_definitions: TEdgeDefinition[]): TStandardEdgeResponses {
  // For every edge_definition

  // create helpers
  const helper_objects = create_helper_objects(config);
  const nodes = mapped_nodes(config, path_map);

  return flatten(edge_definitions.map(edge_definition => {
    return validate_edge(config, nodes, edge_definition, helper_objects);
  }));
}

function validate_edge(config: TConfig, nodes: MappedNode[], edge_definition: TEdgeDefinition, helpers: THelpers): TStandardEdgeResponses {
  const response = [];

  // Basic checks for Node existence
  const source_node = get(nodes, edge_definition.source_node_name);
  const target_node = get(nodes, edge_definition.target_node_name);

  // Tell me about this Edge
  const required = edge_definition.required;
  const edge_name = `${source_node}_${target_node}`;
  const missing_a_node = !source_node || !target_node;

  // if edge required and either nodes is missing => Red
  if (required && missing_a_node) {
    response.push({
      message: `Required nodes (${source_node} & ${target_node}) are not found`,
      status: EStandardEdgeStatus.Red
    });
    return response; // Return early, nothing else you can do
  }

  // if edge not required and missing either node => Blue
  if (!required && missing_a_node) {
    response.push({
      message: 'Something missing, but edge not required anyway',
      status: EStandardEdgeStatus.Blue
    });
    return response; // Return early, nothing else to do
  }

  // Find and run the custom edge validation
  if (edge_name in custom_validations) {
    const edge_fn: (source_node: object, target_node: object, helpers: THelpers) => TCustomEdgeResponses = get(custom_validations, edge_name);

    const custom_edge_response = edge_fn(source_node, target_node, helpers);
    // TODO:: What to do with return TCustomEdgeResponses?
    response.push(flatten(custom_edge_response));

  } else {
    response.push({
      message: `Cannot find custom validation function ${edge_name}`,
      status: EStandardEdgeStatus.Red
    });
  }

  // Send something back!
  return response;
}

