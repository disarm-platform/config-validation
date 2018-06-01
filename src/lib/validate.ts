import { TConfig } from '../definitions/TConfig';
import { ENodeResponseStatus, TNodeResponse } from './TNodeResponse';
import { TUnifiedResponse, EUnifiedStatus } from './TUnifiedResponse';

import { Edge, Graph } from 'graphlib';
import { EEdgeStatus, TEdgeResponse } from './EdgeResponse';
import pathMap from './helpers/path_map'

/**
 * Take the whole config and figure if it's valid.
 */
export function validate(config: TConfig): TUnifiedResponse {
  // Check config passes some basic checks, like it's an object
  if (typeof config !== 'object') return {
    status: EUnifiedStatus.Red,
    messages: ['This config is not an object']
  }

  // Create reference

  const responses: TEdgeResponse[]
  // Find or map a path map, that converts node_names into config object paths
  // e.g. irs_monitor --> applets.irs_monitor
  // used to simplify locating

  // Graph or array of edges from config
  // get edges, create graph
  const graph = new Graph()

  // find graph's sources, and recursively find each child
  // recurse_graph(config, graph)

  // Combine all responses, to figure out what is correct response
  return determine_end_result([])
}


function recurse_graph(config: TConfig, graph: Graph): TEdgeResponse[] {
  return graph.edges().map(edge => validate_edge(config, edge))
}

function validate_edge(config: TConfig, edge: Edge): TEdgeResponse {
  // check both nodes
  // validate_nodes(config, edge)

  return {
    messages: ['Edge fine'],
    status: EEdgeStatus.Green
  }
}

function validate_nodes(config: TConfig, edge: Edge): TNodeResponse[] {
  return [
    validate_node(config, edge.v),
    validate_node(config, edge.w)
  ]
}

function validate_node(config: TConfig, node: string): TNodeResponse {
  return {
    messages: ['Node xx fine'],
    status: ENodeResponseStatus.Green
  }
}

function determine_end_result(response_messages: string[]): TUnifiedResponse {
  // Figure implications from all the messages
  return {
    messages: response_messages,
    status: EUnifiedStatus.Green,
  }
}
